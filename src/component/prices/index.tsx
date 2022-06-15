import { inject, observer } from "mobx-react";
import React from "react";
import PricesStore from '../../state/prices'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { ItemTypePrices } from "../../type/prices/item_type";
import { ItemTierPrices } from "../../type/prices/item_tier";
import CItemTierPrices from './item_tier'
import Multiselect from "multiselect-react-dropdown";

class PricesComponent extends React.Component {
    pricesStore: PricesStore

    constructor(props: any) {
        super(props)
        this.pricesStore = props.PricesStore
    }

    render(): React.ReactNode {
        let tabLists = this.pricesStore.prices.getActualPrices().map(
            (i: ItemTypePrices, index: number) => <Tab key={index}>{i.slot}</Tab>
        )

        let tabPanels = this.pricesStore.prices.getActualPrices().map(
            (i: ItemTypePrices, index: number) => {
                let content = i.tiers.map(
                    (j: ItemTierPrices, jI: number) => <CItemTierPrices key={"prices" + jI} tier={j}/>
                )

                return <TabPanel key={"panel" + index}>
                    Slot: {i.slot}
                    {content}
                </TabPanel>
            }
        )

        return (
            <div>
                <Multiselect
                    singleSelect={true}
                    options={
                        [
                            {'name': 'caerleon'},
                            {'name': 'thetford'},
                            {'name': 'fort_sterling'},
                            {'name': 'lymhurst'},
                            {'name': 'bridgewatch'},
                        ]
                    }
                    placeholder={'Select item'}
                    onSelect={(l: any, i: any) => {
                        this.pricesStore.prices.setCity(i.name)
                    }}
                    displayValue='name'
                    selectedValues={
                        [{'name': this.pricesStore.prices.city}]
                    }
                />
                <Tabs>
                    <TabList>
                        {tabLists}
                    </TabList>

                    {tabPanels}
                </Tabs>
                <button
                    onClick={() => this.pricesStore.fetchPrices()}
                >Fetch</button>
            </div>
        )
    }
}

export const CPrices = inject(
    'PricesStore'
)(observer(PricesComponent))