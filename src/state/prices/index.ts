import { trace } from "console"
import { autorun, makeAutoObservable } from "mobx"
import MainStore from ".."
import { PlayerMastery } from "../../type/mastery"
import { ItemMastery } from "../../type/mastery/item"
import { ItemTypeMastery } from "../../type/mastery/type"
import {Prices} from "../../type/prices"
import { ItemPrice } from "../../type/prices/item"
import { ItemTierPrices } from "../../type/prices/item_tier"
import { ItemTypePrices } from "../../type/prices/item_type"
import CostHolder from "../../type/prices/cost_holder"
import ItemHelper from "../../helper/item_helper"
import IPHelper from "../../helper/IPHelper"

class PricesStore {
    prices: Prices
    mainStore: MainStore
    actualCost: number = 0
    actualIP: number = -1
    itemHelper: ItemHelper = new ItemHelper()
    ipHelper: IPHelper = new IPHelper()
    isFetched: boolean = false

    constructor(mainStore: MainStore) {
        makeAutoObservable(this)
        this.prices = new Prices(this)
        this.mainStore = mainStore
    }

    fetchPrices(): void {
        this.prices.fetchPrices()
        this.isFetched = true
    }

    setNonFetched() {
        this.isFetched = false
    }

    calculate(necessaryIP: number): void {
        this.actualCost = 0
        this.actualIP = 0
        this.foundSolution = false
        
        let prices = this.prices.getActualPrices()
        let set: CostHolder[] = []
        prices.forEach(() => set.push(new CostHolder()))
        let masteryIP = this.mainStore.masteryStore.getIPs()

        let gearStore = this.mainStore.gearStore
        let baseIP = 0
        prices.forEach((i) => {
            let baseType = gearStore.getBaseTypeForSlot(i.slot)
            let ip = this.itemHelper.getAdditionalIP(baseType)
            baseIP += ip
            console.log([baseType, ip])
        })

        let manuallyEditedSlots = prices.map((i) => {
            let gearSlot = gearStore.itemSet.find((j) => j.slot == i.slot)
            if (gearSlot?.manuallyEdited) {
                return {tier: gearSlot?.tier ?? 0, enchantment: gearSlot?.enchantment ?? 0}
            } 
            return false
        })


        this.recursion(0, prices, 0, baseIP, set, masteryIP, necessaryIP, prices.length, manuallyEditedSlots)
        console.log('Ends')
        if (!this.foundSolution) {
            alert("Too high IP")
        }
    }

    recursion(
        index: number,
        prices: ItemTypePrices[],
        cost: number,
        ip: number,
        set: CostHolder[],
        masteryIP: any[],
        necessaryIP: number,
        length: number,
        manuallyEditedSlots: any[]
    ) {
        let items = prices[index]
        let singleMasteryIp = masteryIP.find((i) => i.slot == items.slot).ip

        let manual = manuallyEditedSlots[index]
        if (manual !== false) {
            set[index].pricesIndex = index
            set[index].tier = manual.tier
            set[index].enchantment = manual.enchantment
            let generalIP = ip + singleMasteryIp * this.ipHelper.getTierMasteryModifier(manual.tier)

            let tier = items.tiers.find((i) => i.tier == manual.tier);
            let item = tier?.items.find((i) => i.tier == manual.tier && i.enchantment == manual.enchantment)
            let itemPrice = 0//item?.hasPrice() ? item?.price : 0 ?? 0
            let itemIp = item?.ip ?? 0

            let newCost = cost + itemPrice
            let newIP = itemIp + generalIP

            if (index >= prices.length - 1) {
                let actualIP = newIP / length
                //console.log([this.counter++, actualIP])
                if (actualIP >= necessaryIP) {
                    if (this.actualCost == 0 || this.actualCost > newCost) {
                        console.log([actualIP, newCost, set.map((i) => [i.pricesIndex, i.tier, i.enchantment])])
                        let gearStore = this.mainStore.gearStore
                        set.forEach((i, itemIndex) => {
                            gearStore.itemSet[itemIndex].tier = i.tier
                            gearStore.itemSet[itemIndex].enchantment = i.enchantment
                        })
                        gearStore.calculateOwnIPs()
                        this.foundSolution = true
                        
                        this.actualCost = newCost
                        this.actualIP = actualIP
                    }
                }
            } else {
                this.recursion(index + 1, prices, newCost, newIP, set, masteryIP, necessaryIP, length, manuallyEditedSlots)
            }
        } else {
            items.tiers.forEach((tierPrices: ItemTierPrices) => {
                let generalIP = ip + singleMasteryIp * this.ipHelper.getTierMasteryModifier(tierPrices.tier)
                tierPrices.items.forEach((item: ItemPrice) => {
                    if (!item.hasPrice()) {
                        return
                    }
    
                    set[index].pricesIndex = index
                    set[index].tier = item.tier
                    set[index].enchantment = item.enchantment
                    let newCost = cost + item.price
                    let newIP = item.ip + generalIP
                    if (index >= prices.length - 1) {
                        let actualIP = newIP / length
                        //console.log([this.counter++, actualIP])
                        if (actualIP >= necessaryIP) {
                            if (this.actualCost == 0 || this.actualCost > newCost) {
                                console.log([actualIP, newCost, set.map((i) => [i.pricesIndex, i.tier, i.enchantment])])
                                let gearStore = this.mainStore.gearStore
                                set.forEach((i, itemIndex) => {
                                    gearStore.itemSet[itemIndex].tier = i.tier
                                    gearStore.itemSet[itemIndex].enchantment = i.enchantment
                                })
                                gearStore.calculateOwnIPs()
                                this.foundSolution = true
                                
                                this.actualCost = newCost
                                this.actualIP = actualIP
                            }
                        }
                    } else {
                        this.recursion(index + 1, prices, newCost, newIP, set, masteryIP, necessaryIP, length, manuallyEditedSlots)
                    }
                })
            })
        }
    }

    counter: number = 0
    foundSolution: boolean = false
}

export default PricesStore;