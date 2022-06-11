import {observer} from "mobx-react";
import {ChangeEvent, ReactNode} from "react";
import { ItemMastery } from "../../../type/mastery/item";
import CItemMastery from "../item_mastery";
import {CItemTypeMasteryComponentInput} from "../../../type/component/mastery/item_type_mastery"

export default observer((input: CItemTypeMasteryComponentInput) => {        

    let masteries: ReactNode[] = [
        <CItemMastery key={"-1"} itemMastery={input.itemTypeMastery.itemMastery} itemTypeMastery={input.itemTypeMastery} label={'Item itself'}/>
    ]

    input.itemTypeMastery.otherMasteries.forEach(
        (i: ItemMastery, index: number) => 
            masteries.push(<CItemMastery key={index} itemMastery={i} itemTypeMastery={input.itemTypeMastery} label={'Another item №' + (index + 1)}/>)
    )
    
    return <div>
        <div>Slot: {input.itemTypeMastery.slot}</div>

        <label>
            <div>Item Type Mastery</div>
            <input
                type="number"
                value={input.itemTypeMastery.typeMastery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => input.itemTypeMastery.setTypeMastery(parseInt(e.target.value))}
            />
        </label>
        {masteries}
    </div>
})