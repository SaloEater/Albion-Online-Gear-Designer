import { computed } from "mobx";
import {inject, observer} from "mobx-react";
import React, {ChangeEvent, ChangeEventHandler} from "react";
import withRouter from "react-router-dom";
import { Tab } from "react-tabs";
import MasteryStore from "../../../state/mastery"
import { CItemMasteryComponentInput } from "../../../type/component/item_mastery/view";
import GearItem from "../../../type/gear/item";
import { ItemMastery } from "../../../type/mastery/item";
import { ItemTypeMastery } from "../../../type/mastery/type";
import GearItemTypeList from "../../../type/gear/list/item";
import Multiselect from 'multiselect-react-dropdown';
import {CGearItemInput} from '../../../type/component/gear/item'
import TranslatedGearItemType from "../../../type/gear/translated_list/item";
import styles from "./styles.module.css"
import { useTranslation } from "react-i18next";

export default observer((input: CGearItemInput) => {
    const { t, i18n } = useTranslation();
    let item = input.item
    let list = input.list
    let label = item.slot

    let selected = list.items.find((i) => i.type == item.baseType)
    let selectedValues = selected !== undefined ? [selected] : []
    let lockedIp = item.manuallyEdited ?
        <div>
            {t('gear.hardcoded_ip')}:
            <input
                type="checkbox"
                checked={item.manuallyEdited}
                readOnly={true}
            />
        </div>
    : <div></div>

    return <div className={styles.item}>
        <label>
            <Multiselect
                onKeyPressFn={(e, i) => console.log(i)}
                onSearch={(i) => console.log(i)}
                keepSearchTerm={true}
                singleSelect={true}
                options={list.items}
                placeholder={t('gear.select_item')}
                onSelect={(l: any, i: TranslatedGearItemType) => {
                    item.setBaseType(i.type)
                }}
                displayValue='translation'
                selectedValues={selectedValues}
            />
            <input
                name={label+"_spec"}
                type="number"
                min={4}
                max={8}
                value={item.tier}
                onChange={(e: ChangeEvent<HTMLInputElement>) => item.setTierManually(parseInt(e.target.value))}
            />
            <input
                name={label+"_rate"}
                type="number"
                min={0}
                max={3}
                value={item.enchantment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => item.setEnchantment(parseInt(e.target.value))}
            />
            <div>
                <button
                    onClick={() => item.calculateOwnIP()}
                >{t('gear.calculate_ip')}</button>
                {t('gear.ip_stat')}: {item.totalIP}
            </div>
            {lockedIp}
            <div>
                {t('gear.price_stat')}: {item.getPrice()}
            </div>
        </label>
    </div>
})