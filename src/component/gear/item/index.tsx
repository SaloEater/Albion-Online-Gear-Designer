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

export default observer((input: CGearItemInput) => {
    let item = input.item
    let list = input.list
    let label = item.slot

    return <div>
        <label>
            <div>{label}</div>
            <Multiselect
                singleSelect={true}
                options={list.items.map((i: string) => {
                    return {
                        'type': i
                    }
                })}
                placeholder={'Select item'}
                onSelect={(l: any, i: any) => {
                    item.setBaseType(i.type)
                }}
                displayValue='type'
                selectedValues={
                    [{'type': item.baseType}]
                }
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
                Price: {item.getPrice()}
            </div>
            <div>
                Hardcoded:
                <input
                    type="checkbox"
                    checked={item.manuallyEdited}
                    readOnly={true}
                />
                {/* <button
                    onClick={() => item.calculateOwnIP()}
                >IP</button> */}
                IP: {item.totalIP}
            </div>
        </label>
    </div>
})