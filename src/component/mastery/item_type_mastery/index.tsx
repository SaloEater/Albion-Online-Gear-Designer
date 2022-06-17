import {observer} from "mobx-react";
import {ChangeEvent, ReactNode} from "react";
import { ItemMastery } from "../../../type/mastery/item";
import CItemMastery from "../item_mastery";
import {CItemTypeMasteryComponentInput} from "../../../type/component/mastery/item_type_mastery"
import { useTranslation } from "react-i18next";

export default observer((input: CItemTypeMasteryComponentInput) => {        
    const { t, i18n } = useTranslation();
    
    let masteries: ReactNode[] = [
        <CItemMastery key={"-1"} itemMastery={input.itemTypeMastery.itemMastery} itemTypeMastery={input.itemTypeMastery} label={t('mastery.item')}/>
    ]

    input.itemTypeMastery.otherMasteries.forEach(
        (i: ItemMastery, index: number) => 
            masteries.push(<CItemMastery key={index} itemMastery={i} itemTypeMastery={input.itemTypeMastery} label={t('mastery.other_mastery', {number: (index + 1)})}/>)
    )
    
    return <div>
        <label>
            <div>{t('mastery.item_type')}</div>
            <input
                type="number"
                value={input.itemTypeMastery.typeMastery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => input.itemTypeMastery.setTypeMastery(parseInt(e.target.value))}
            />
        </label>
        {masteries}
    </div>
})