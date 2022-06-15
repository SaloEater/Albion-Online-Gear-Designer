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
        this.loadFromStorage()
    }

    save() {
        localStorage.setItem('masteryStore.itemTypeMasteries', this.createItemTypeMasteriesSnapshot())
        localStorage.setItem('masteryStore.itemMasteries', this.createItemMasteriesSnapshot())
        localStorage.setItem('masteryStore.otherMasteries', this.createOtherMasteriesSnapshot())
    }

    createItemTypeMasteriesSnapshot(): string {
        return JSON.stringify(this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => [i.slot, i.typeMastery]
        ))
    }

    createItemMasteriesSnapshot(): string {
        return JSON.stringify(this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => [i.slot, i.itemMastery.spec, i.itemMastery.rate]
        ))
    }

    createOtherMasteriesSnapshot(): string {
        return JSON.stringify(this.playerMastery.masteries.map(
            (i: ItemTypeMastery) => {
                let data = i.otherMasteries.map((j: ItemMastery) => [j.spec, j.rate])
                return [i.slot, data]
            }
        ))
    }

    loadFromStorage() {
        this.loadItemTypeMasteries(localStorage.getItem('masteryStore.itemTypeMasteries'))
        this.loadItemMasteries(localStorage.getItem('masteryStore.itemMasteries'))
        this.loadOtherMasteries(localStorage.getItem('masteryStore.otherMasteries'))
    }

    loadItemTypeMasteries(data: string|null) {
        let parsedData: [] = JSON.parse(data ?? '[]')

        parsedData.forEach((i: any) => {
            let name = i[0]
            let typeMastery = i[1];
            this.playerMastery.masteries.filter((i: ItemTypeMastery) => i.slot == name).forEach((i: ItemTypeMastery) => i.typeMastery = typeMastery)
        })
    }

    loadItemMasteries(data: string|null) {
        let parsedData: [] = JSON.parse(data ?? '[]')

        parsedData.forEach((i: any) => {
            let name = i[0]
            let spec = i[1];
            let rate = i[2];
            this.playerMastery.masteries.filter((i: ItemTypeMastery) => i.slot == name).forEach((i: ItemTypeMastery) => {
                i.itemMastery.spec = spec
                i.itemMastery.rate = rate
            })
        })
    }

    loadOtherMasteries(data: string|null) {
        let parsedData: [] = JSON.parse(data ?? '[]')

        parsedData.forEach((i: any) => {
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

    createSnapshot() {
        return JSON.stringify({
            itemTypeMasteries: this.createItemTypeMasteriesSnapshot(),
            itemMasteries: this.createItemMasteriesSnapshot(),
            otherMasteries: this.createOtherMasteriesSnapshot()
        })
    }

    loadFromObject(data: any) {
        this.loadItemTypeMasteries(data.itemTypeMasteries)
        this.loadItemMasteries(data.itemMasteries)
        this.loadOtherMasteries(data.otherMasteries)
    }
}

export default MasteryStore;