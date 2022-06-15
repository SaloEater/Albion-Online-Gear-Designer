import MasteryStore from "./mastery";
import GearStore from "./gear";
import PricesStore from "./prices";
import LoadoutStore from "./loadout";

export class MainStore {
    masteryStore: MasteryStore
    gearStore: GearStore
    pricesStore: PricesStore
    loadoutStore: LoadoutStore

    constructor() {
        this.pricesStore = new PricesStore(this)
        this.masteryStore = new MasteryStore(this)
        this.gearStore = new GearStore(this)
        this.loadoutStore = new LoadoutStore(this)
    }

    createSnapshot(): string {
        let mastery = this.masteryStore.createSnapshot()
        let gear = this.gearStore.createSnapshot()
        return JSON.stringify({
            mastery: mastery,
            gear: gear
        })
    }
}

export default MainStore;