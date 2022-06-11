import { makeObservable, observable } from "mobx";
import { Prices } from "..";
import { ItemPrice } from "../item";
import { ItemTierPrices } from '../item_tier'

export class ItemTypePrices {
    tiers: ItemTierPrices[] = []
    slot: string
    prices: Prices

    constructor(prices: Prices, slot: string) {
        makeObservable(this, {
            tiers: observable,
            slot: observable
        })
        this.prices = prices
        this.slot = slot
        this.tiers.push(new ItemTierPrices(this, 4))
        this.tiers.push(new ItemTierPrices(this, 5))
        this.tiers.push(new ItemTierPrices(this, 6))
        this.tiers.push(new ItemTierPrices(this, 7))
        this.tiers.push(new ItemTierPrices(this, 8))
    }

    fetchPrices(): void {
        this.tiers.forEach((i: ItemTierPrices) => i.fetchPrices())
    }
}