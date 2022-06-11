import { throws } from "assert"
import { makeAutoObservable, observable, computed, action, makeObservable, autorun } from "mobx"
import { PlayerMastery } from ".."
import MasteryStore from "../../../state/mastery"
import { ItemMastery as ItemMastery } from "../item"

export class ItemTypeMastery {
    slot: string
    typeMastery: number = 0
    itemMastery: ItemMastery
    otherMasteries: ItemMastery[] = []
    store: MasteryStore

    constructor(slot: string, store: MasteryStore) {
        makeObservable(this, {
            slot: observable,
            itemMastery: observable,
            otherMasteries: observable,
            typeMastery: observable,
            setTypeMastery: action,
            removeEmptyMasteries: action,
            _updateOtherMastery: action
        })
        this.slot = slot
        this.store = store

        let other: ItemMastery[] = []
        for (let i = 0; i < 8; i++) {
            other.push(new ItemMastery(this.store))
        }
        this.otherMasteries = other

        this.itemMastery = new ItemMastery(this.store, 0.2)
    }

    setTypeMastery(value: number) {
        this.typeMastery = value
        this.store.save()
    }

    removeEmptyMasteries() {
        let updated = this.otherMasteries;
        let indices: number[] = [];
        updated.forEach((i: ItemMastery, index) => indices.push(index));
        indices.reverse().forEach((i) => updated.splice(i));
        this.otherMasteries = updated;
        this.store.save()
    }
    
    _updateOtherMastery(index: number, spec: any, rate: any) {
        this.otherMasteries[index].spec = spec
        this.otherMasteries[index].rate = rate
    }

    getIP(): number {        
        let ip = this.typeMastery * 0.2 + this.itemMastery.getIP() + this.itemMastery.getMainItemIP()
        this.otherMasteries.forEach((i) => ip += i.getIP())

        return ip
    }
}