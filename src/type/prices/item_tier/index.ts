import { makeObservable, observable } from "mobx"
import { ItemPrice } from "../item"
import { ItemTypePrices } from "../item_type"
import {MarketItemPrice} from "../../response/item_price"

export class ItemTierPrices {
    items: ItemPrice[] = []
    tier: number
    itemTypePrices: ItemTypePrices

    constructor(itemTypePrices: ItemTypePrices, tier: number) {
        makeObservable(this, {
            items: observable,
            tier: observable
        })
        this.tier = tier
        this.itemTypePrices = itemTypePrices
        this.items.push(new ItemPrice(this, tier, 0))
        this.items.push(new ItemPrice(this, tier, 1))
        this.items.push(new ItemPrice(this, tier, 2))
        this.items.push(new ItemPrice(this, tier, 3))
    }

    
    fetchPrices(): void {
        let location = this.itemTypePrices.prices.city
        let requestString = 'https://www.albion-online-data.com/api/v2/stats/Prices/'

        let selectedItem = this.itemTypePrices.prices.store.mainStore.gearStore.getBaseTypeForSlot(this.itemTypePrices.slot)

        let items: string[] = [];
        this.items.forEach((j: ItemPrice) => {
            let item = 'T' + j.tier + '_' + selectedItem

            if (j.enchantment !== 0) {
                item += '@' + j.enchantment
            }

            items.push(item)
        })
        
        requestString += items.join(',')
        requestString += '.json?locations=' + location
        //console.log('Fetching ' + requestString)
        fetch(requestString)
            .then(res => res.json())
            .then((res: MarketItemPrice[]) => {
                let sorted = res
                    .filter((i: MarketItemPrice) => i.sell_price_min != 0)
                    .sort((a, b) => a.sell_price_min_date > b.sell_price_min_date ? 1 : (b.sell_price_min_date > a.sell_price_min_date ? -1 : 0))
                //console.log(sorted)
                this.items.forEach((i: ItemPrice) => {
                    let itemId = 'T' + this.tier + '_' + selectedItem
                    if (i.enchantment != 0) {
                        itemId += '@' + i.enchantment
                    }
                    let item = sorted.find((i: MarketItemPrice) => i.item_id == itemId)
                    if (item) {
                        let sameDate = sorted.filter((i: MarketItemPrice) => i.sell_price_min_date == item?.sell_price_min_date && i.item_id == item?.item_id)
                        sameDate = sameDate.sort((i: MarketItemPrice) => i.quality)
                        item = sameDate[0]
                        //console.log('Found price for ' + itemId)
                        i.setPrice(item.sell_price_min)
                    }
                })                
            })
    }
}