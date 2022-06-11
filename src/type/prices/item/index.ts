import { action, makeObservable, observable } from "mobx"
import IPHelper from "../../../helper/IPHelper"
import { ItemTierPrices } from "../item_tier"
import { ItemTypePrices } from "../item_type"

export class ItemPrice {
    price: number = 0
    tier: number
    enchantment: number
    itemTierPrices: ItemTierPrices
    ip: number = 0
    ipHelper: IPHelper = new IPHelper()

    constructor(itemTierPrices: ItemTierPrices, tier: number, enchantment: number) {
        makeObservable(this, {
            price: observable,
            tier: observable,
            enchantment: observable,
            setEnchantment: action,
            setPrice: action
        })
        this.itemTierPrices = itemTierPrices
        this.tier = tier
        this.enchantment = enchantment
    }
    
    setEnchantment(enchantment: number): void {
        this.enchantment = this.limitBy(enchantment, 0, 3)
        this.updateIP()
    }

    setPrice(price: number): void {
        this.price = price
        this.updateIP()
    }

    private limitBy(value: number, min: number, max: number): number {
        return value > max ? max : (value < min ? min : value)
    }
    
    updateIP() {
        this.ip = this.ipHelper.getIP(this.tier, this.enchantment)
    }

    hasPrice(): boolean {
        return this.price !== 0
    }
}