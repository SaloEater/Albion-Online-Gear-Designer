import MasteryStore from "./mastery";
import GearStore from "./gear";
import PricesStore from "./prices";
import LoadoutStore from "./loadout";
import LanguageStore from "./language";

export class MainStore {
    masteryStore: MasteryStore
    gearStore: GearStore
    pricesStore: PricesStore
    loadoutStore: LoadoutStore
    languageStore: LanguageStore

    constructor() {
        this.pricesStore = new PricesStore(this)
        this.masteryStore = new MasteryStore(this)
        this.gearStore = new GearStore(this)
        this.loadoutStore = new LoadoutStore(this)
        this.languageStore = new LanguageStore(this)
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