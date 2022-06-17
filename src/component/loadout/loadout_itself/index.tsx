import {inject, observer} from "mobx-react";
import Multiselect from "multiselect-react-dropdown";
import { ChangeEvent } from "react";
import LoadoutStore from "../../../state/loadout";
import LoadoutItem from "../../../type/loadout/dropdown_element";

export default observer((input: {loadoutStore: LoadoutStore, t: any}) => {
    let nameChanger = <div></div>
    let removeButton = <div></div>
    let saveButton = <div></div>
    if (input.loadoutStore.selectedIndex !== -1) {
        nameChanger = <input
            name={"loadout_name"}
            type="string"
            value={input.loadoutStore.getSelected().name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => input.loadoutStore.changeName(e.target.value)}
        />

        removeButton = <button
            onClick={() => input.loadoutStore.removeCurrent()}
        >{input.t('delete')}</button>

        saveButton = <button
            onClick={() => input.loadoutStore.saveCurrent()}
        >{input.t('save')}</button>
    }

    return <div>
        <Multiselect
            singleSelect={true}
            options={input.loadoutStore.prepareLoadoutForDropdown()}
            placeholder={'Select loadout'}
            onSelect={(l: any, i: LoadoutItem) => {
                input.loadoutStore.loadLoadout(i)
            }}
            displayValue='name'
            selectedValues={[
                input.loadoutStore.getSelected()
            ]}
        />
        {nameChanger}
        {removeButton}
        {saveButton}
    </div>
})