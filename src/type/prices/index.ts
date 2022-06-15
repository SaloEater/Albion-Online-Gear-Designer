import { action, makeObservable, observable } from "mobx";
import PricesStore from "../../state/prices";
import { ItemTierPrices } from "./item_tier";
import { ItemTypePrices } from "./item_type";

export class Prices {
    prices: ItemTypePrices[] = []
    store: PricesStore
    city: string = 'caerleon'

    constructor(store: PricesStore) {
        makeObservable(this, {
            prices: observable,
            city: observable,
            setCity: action
        })
        this.store = store
        this.prices.push(new ItemTypePrices(this, 'helmet'))
        this.prices.push(new ItemTypePrices(this, 'cape'))
        this.prices.push(new ItemTypePrices(this, 'body armour'))
        this.prices.push(new ItemTypePrices(this, 'boots'))
        this.prices.push(new ItemTypePrices(this, 'main hand'))
        this.prices.push(new ItemTypePrices(this, 'offhand'))
    }
    
    getActualPrices(): ItemTypePrices[] {
        return this.prices.filter(
            (i: ItemTypePrices) => !this.store.mainStore.gearStore.isTwoHanded || i.slot != 'offhand'
        )
    }

    fetchPrices() {
        this.getActualPrices().forEach((i) => i.fetchPrices())
    }

    setCity(city: string) {
        this.city = city
        this.store.setNonFetched()
    }

    getPricesFor(slot: string, tier: number, enchantment: number): number {
        let tiers = this.prices.find((i) => i.slot == slot)
        let enchantments = tiers?.tiers.find((i) => i.tier == tier)
        let item = enchantments?.items.find((i) => i.enchantment == enchantment)

        return item?.price ?? 0
    }
}