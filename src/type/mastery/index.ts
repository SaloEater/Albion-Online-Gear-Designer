import { makeObservable, observable, computed, action } from "mobx"
import MainStore from "../../state"
import GearStore from "../../state/gear"
import MasteryStore from "../../state/mastery"
import { ItemTypeMastery } from "./type"

export class PlayerMastery {
    masteries: ItemTypeMastery[] = []
    mainStore: MainStore

    constructor(store: MasteryStore, gearStore: MainStore) {
        makeObservable(this, {
            masteries: observable,
        })
        
        this.masteries.push(new ItemTypeMastery('helmet', store))
        this.masteries.push(new ItemTypeMastery('cape', store))
        this.masteries.push(new ItemTypeMastery('body armour', store))
        this.masteries.push(new ItemTypeMastery('boots', store))
        this.masteries.push(new ItemTypeMastery('main hand', store))
        this.masteries.push(new ItemTypeMastery('offhand', store))
        this.mainStore = gearStore
    }

    getAllMasteries(): ItemTypeMastery[] {
        return this.masteries
    }

    getActualMasteries(): ItemTypeMastery[] {
        return this.masteries.filter((i: ItemTypeMastery) => !this.mainStore.gearStore.isTwoHanded || i.slot != 'offhand')
    }
    
    getMastery(slot: string): ItemTypeMastery|null {
        return this.masteries.find((i) => i.slot == slot) ?? null
    }
}