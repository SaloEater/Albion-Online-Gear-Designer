import { inject, observer } from "mobx-react";
import Multiselect from "multiselect-react-dropdown";
import React, { ChangeEvent } from "react";
import LoadoutStore from "../../state/loadout";
import LoadoutItem from "../../type/loadout/dropdown_element";

class LoadoutComponent extends React.Component {

    loadoutStore: LoadoutStore

    constructor(props: any) {
        super(props)
        this.loadoutStore = props.LoadoutStore
    }

    render(): React.ReactNode {
        let nameChanger = <div></div>
        let removeButton = <div></div>
        let saveButton = <div></div>
        if (this.loadoutStore.selectedIndex !== -1) {
            nameChanger = <input
                name={"loadout_name"}
                type="string"
                value={this.loadoutStore.getSelected().name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => this.loadoutStore.changeName(e.target.value)}
            />

            removeButton = <button
                onClick={() => this.loadoutStore.removeCurrent()}
            >Delete</button>

            saveButton = <button
                onClick={() => this.loadoutStore.saveCurrent()}
            >Save</button>
        }
        return (
            <div>
                <Multiselect
                    singleSelect={true}
                    options={this.loadoutStore.prepareLoadoutForDropdown()}
                    placeholder={'Select item'}
                    onSelect={(l: any, i: LoadoutItem) => {
                        this.loadoutStore.loadLoadout(i)
                    }}
                    displayValue='name'
                    selectedValues={[
                        this.loadoutStore.getSelected()
                    ]}
                />
                {nameChanger}
                {removeButton}
                {saveButton}
            </div>
        )
    }
}

export const CLoadouts = inject(
    "LoadoutStore"
)(observer(LoadoutComponent));