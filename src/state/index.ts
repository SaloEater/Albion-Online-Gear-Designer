import MasteryStore from "./mastery";
import GearStore from "./gear";
import PricesStore from "./prices";

export class MainStore {
    masteryStore: MasteryStore
    gearStore: GearStore
    pricesStore: PricesStore

    constructor() {
        this.masteryStore = new MasteryStore(this)
        this.gearStore = new GearStore(this)
        this.pricesStore = new PricesStore(this)
    }
}

export default MainStore;