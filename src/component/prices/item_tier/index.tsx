import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CItemTierInput } from "../../../type/component/prices/item_tier";
import { ItemPrice } from "../../../type/prices/item";
import CItemPrice from '../item'

export default observer((input: CItemTierInput) => {
    let items = input.tier.items.map(
        (i: ItemPrice, index: number) => <CItemPrice key={"price"+index} item={i} />
    )
    return <div>
        <div>Tier: {input.tier.tier}</div>
        {items}
    </div>
})