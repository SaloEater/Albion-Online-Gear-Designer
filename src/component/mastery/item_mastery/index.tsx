import { computed } from "mobx";
import {inject, observer} from "mobx-react";
import React, {ChangeEvent, ChangeEventHandler} from "react";
import withRouter from "react-router-dom";
import { Tab } from "react-tabs";
import MasteryStore from "../../../state/mastery"
import { CItemMasteryComponentInput } from "../../../type/component/item_mastery/view";
import { ItemMastery } from "../../../type/mastery/item";
import { ItemTypeMastery } from "../../../type/mastery/type";
import styles from "./styles.module.css";

export default observer((input: CItemMasteryComponentInput ) => {
    let label = input.label
    return <div>
        <label>
            <div>{label}</div>
            <input
                name={label+"_spec"}
                type="number"
                min={0}
                max={100}
                value={input.itemMastery.spec}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    input.itemMastery.setSpec(parseInt(e.target.value))
                }}
            />
            <input
                name={label+"_rate"}
                type="number"
                min={0.1}
                max={2}
                step={0.1}
                value={Number(input.itemMastery.rate).toFixed(1)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => input.itemMastery.setRate(parseFloat(e.target.value))}
            />
        </label>
    </div>
})