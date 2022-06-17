import {observer} from "mobx-react";
import Multiselect from "multiselect-react-dropdown";
import { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ItemTypePrices } from "../../../type/prices/item_type";
import { ItemTierPrices } from "../../../type/prices/item_tier";
import CItemTierPrices from './../item_tier'
import PricesStore from '../../../state/prices'
import { t } from "i18next";

export default observer((input: {pricesStore: PricesStore, t: any}) => {
    let tabLists = input.pricesStore.prices.getActualPrices().map(
        (i: ItemTypePrices, index: number) => {    
            let itemName = input.t('gear_type.' + i.slot)
            let name: React.ReactNode = (<div>{itemName}</div>)
            if (index == input.pricesStore.selectedTabIndex) {
                name = <b>{itemName}</b>
            }
            return <Tab key={index}>{name}</Tab>
        }
    )

    let tabPanels = input.pricesStore.prices.getActualPrices().map(
        (i: ItemTypePrices, index: number) => {
            let content = i.tiers.map(
                (j: ItemTierPrices, jI: number) => <CItemTierPrices key={"prices" + jI} tier={j}/>
            )

            return <TabPanel key={"panel" + index}>
                {content}
            </TabPanel>
        }
    )

    let cities = ['caerleon', 'thetford', 'fort_sterling', 'lymhurst', 'bridgewatch', 'martlock']
        .map((i) => {return {name: i, display: input.t('city.' + i)}})

    return <div>
        <Multiselect
            singleSelect={true}
            options={cities}
            placeholder={input.t('prices.select_city')}
            onSelect={(l: any, i: any) => {
                input.pricesStore.prices.setCity(i.name)
            }}
            displayValue='display'
            selectedValues={
                [cities.find((i) => i.name == input.pricesStore.prices.city)]
            }
        />
        <Tabs
            onSelect={(i) => input.pricesStore.setIndex(i)}
        >
            <TabList>
                {tabLists}
            </TabList>

            {tabPanels}
        </Tabs>
        <button
            onClick={() => input.pricesStore.fetchPrices()}
        >{input.t('prices.fetch_prices')}</button>
    </div>
})