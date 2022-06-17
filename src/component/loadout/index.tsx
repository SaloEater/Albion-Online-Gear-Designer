import { inject, observer } from "mobx-react";
import Multiselect from "multiselect-react-dropdown";
import React, { ChangeEvent } from "react";
import { Translation, useTranslation } from "react-i18next";
import LoadoutStore from "../../state/loadout";
import Loadout from './loadout_itself'

class LoadoutComponent extends React.Component {
    loadoutStore: LoadoutStore

    constructor(props: any) {
        super(props)
        this.loadoutStore = props.LoadoutStore
    }

    render(): React.ReactNode {
        return (
            <Translation>
                {
                    t => <Loadout loadoutStore={this.loadoutStore} t={t}/>
                }
            </Translation>
        )
    }
}

export const CLoadouts = inject(
    "LoadoutStore"
)(observer(LoadoutComponent));