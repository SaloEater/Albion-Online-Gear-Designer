import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { CItemPriceInput } from "../../../type/component/prices/item";
import styles from "./styles.module.css"

export default observer((input: CItemPriceInput) => {
    return <div >
        <label>
            {input.item.tier + '.' + input.item.enchantment}
            <input
                className={styles.input}
                type="number"
                min={0}
                max={3}
                step={1}
                value={input.item.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => input.item.setPrice(parseInt(e.target.value))}
            />
        </label>
    </div>
})