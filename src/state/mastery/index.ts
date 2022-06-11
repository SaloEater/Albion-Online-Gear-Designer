import { trace } from "console"
import { autorun, makeAutoObservable } from "mobx"
import MainStore from ".."
import { PlayerMastery } from "../../type/mastery"
import { ItemMastery } from "../../type/mastery/item"
import { ItemTypeMastery } from "../../type/mastery/type"

class MasteryStore {
    test: ItemTypeMastery
    playerMastery: PlayerMastery

    constructor(mainStore: MainStore) {
        makeAutoObservable(this)
        this.test = new ItemTypeMastery('test', this)
        this.playerMastery = new PlayerMastery(this, mainStore)
        this.load()
    }

    save() {
        let itemTypeMasteries = this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => [i.slot, i.typeMastery]
        )

        let itemMasteries = this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => [i.slot, i.itemMastery.spec, i.itemMastery.rate]
        )

        let otherMasteries = this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => {
                let data = i.otherMasteries.map((j: ItemMastery) => [j.spec, j.rate])
                return [i.slot, data]
            }
        )

        localStorage.setItem('masteryStore.itemTypeMasteries', JSON.stringify(itemTypeMasteries))
        localStorage.setItem('masteryStore.itemMasteries', JSON.stringify(itemMasteries))
        localStorage.setItem('masteryStore.otherMasteries', JSON.stringify(otherMasteries))
    }

    load() {
        let itemTypeMasteries: [] = JSON.parse(localStorage.getItem('masteryStore.itemTypeMasteries') ?? '[]')
        let itemMasteries: [] = JSON.parse(localStorage.getItem('masteryStore.itemMasteries') ?? '[]')
        let otherMasteries: [] = JSON.parse(localStorage.getItem('masteryStore.otherMasteries') ?? '[]')

        itemTypeMasteries.forEach((i: any) => {
            let name = i[0]
            let typeMastery = i[1];
            this.playerMastery.masteries.filter((i: ItemTypeMastery) => i.slot == name).forEach((i: ItemTypeMastery) => i.typeMastery = typeMastery)
        })

        itemMasteries.forEach((i: any) => {
            let name = i[0]
            let spec = i[1];
            let rate = i[2];
            this.playerMastery.masteries.filter((i: ItemTypeMastery) => i.slot == name).forEach((i: ItemTypeMastery) => {
                i.itemMastery.spec = spec
                i.itemMastery.rate = rate
            })
        })

        otherMasteries.forEach((i: any) => {
            let name = i[0]
            let masteries = i[1];
            this.playerMastery.masteries.filter((i: ItemTypeMastery) => i.slot == name).forEach((i: ItemTypeMastery) => {
                masteries.forEach((j: any, index: number) => {
                    let spec = j[0]
                    let rate = j[1]
                    i._updateOtherMastery(index, spec, rate)
                })
            })
        })
    }

    clearCache() {
        localStorage.removeItem('masteryStore.itemTypeMasteries')
        localStorage.removeItem('masteryStore.itemMasteries')
        localStorage.removeItem('masteryStore.otherMasteries')
        localStorage.removeItem('gearStore.itemSet')
    }

    getIPs(): any[] {
        return this.playerMastery.getActualMasteries().map((i) => {return {slot: i.slot, ip: i.getIP()}})
    }
}

export default MasteryStore;