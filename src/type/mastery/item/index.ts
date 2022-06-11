import { throws } from "assert"
import { action, computed, makeObservable, observable } from "mobx"
import { PlayerMastery } from ".."
import MasteryStore from "../../../state/mastery"

export class ItemMastery {
    spec: number = 0
    rate: number = 0.1
    store: MasteryStore

    constructor(store: MasteryStore, rate: number = 0.1) {
        makeObservable(this, {
            spec: observable,
            rate: observable,
            mastery: computed,
            setRate: action,
            setSpec: action
        })
        this.store = store
        this.rate = rate
    }

    get mastery(): number {
        return this.spec * this.rate
    }
    
    setRate(rate: number): void {
        this.rate = this.limitBy(rate, 0.1, 2)
        this.store.save()
    }

    setSpec(spec: number): void {
        this.spec = this.limitBy(spec, 0, 100)
        this.store.save()
    }

    private limitBy(value: number, min: number, max: number): number {
        return value > max ? max : (value < min ? min : value)
    }

    getIP(): number {
        return this.spec * this.rate
    }

    getMainItemIP() {
        return this.spec * 2
    }
}