import { inject, observer } from "mobx-react";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { ItemTypePrices } from "../../type/prices/item_type";
import { ItemTierPrices } from "../../type/prices/item_tier";
import CItemTierPrices from './item_tier'
import Multiselect from "multiselect-react-dropdown";
import { Translation } from "react-i18next";
import Prices from './itself'
import PricesStore from '../../state/prices'

class PricesComponent extends React.Component {
    pricesStore: PricesStore

    constructor(props: any) {
        super(props)
        this.pricesStore = props.PricesStore
    }

    render(): React.ReactNode {
        

        return (
            <Translation>
                {
                    t => <Prices pricesStore={this.pricesStore} t={t}/>
                }
            </Translation>
        )
    }
}

export const CPrices = inject(
    'PricesStore'
)(observer(PricesComponent))