import { inject, observer } from "mobx-react"
import React, { ChangeEvent } from "react"
import { Translation, useTranslation } from "react-i18next"
import GearStore from "../../state/gear"
import GearItem from "../../type/gear/item"
import GearItemTypeList from "../../type/gear/list/item"
import CGearItem from "./item"
import GearSet from './itself'

class GearSetComponent extends React.Component {
    gearStore: GearStore

    constructor(props: any) {
        super(props)
        this.gearStore = props.GearStore
    }

    render(): React.ReactNode {

        return (
            <Translation>
                {
                    t => <GearSet gearStore={this.gearStore} t={t} />
                }
            </Translation>            
        );
    }

}

export const CGearSet = inject(
    "GearStore"
)(observer(GearSetComponent));