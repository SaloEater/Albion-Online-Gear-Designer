import { action, makeObservable, observable } from "mobx";
import Loadout from "../../type/loadout";
import MainStore from "../"
import LoadoutItem from "../../type/loadout/dropdown_element"

export default class LoadoutStore {
    loadouts: Loadout[] = []
    selectedIndex: number = -1
    mainStore: MainStore

    constructor(mainStore: MainStore) {
        makeObservable(this, {
            loadouts: observable,
            selectedIndex: observable,
            select: action,
            createNewLoadout: action,
            removeCurrent: action,
            loadLoadout: action
        })
        this.mainStore = mainStore
        this.load()
    }

    load() {
        let data: any = JSON.parse(localStorage.getItem('loadout') ?? '"none"')
        if (data != 'none') {
            let rawLoadouts = data.loadouts
            rawLoadouts.forEach((i: Loadout) => this.loadouts.push(new Loadout(
                i.name,
                i.data
            )))
    
            this.select(data.selectedIndex)
            //this.loadByIndex(this.selectedIndex)
        }        
    }

    save() {
        localStorage.setItem('loadout', JSON.stringify({
            loadouts: this.loadouts,
            selectedIndex: this.selectedIndex
        }))
    }

    clearCache() {
        localStorage.removeItem('loadout')
    }

    select(index: number) {
        this.selectedIndex = index
    }

    createNewLoadout() {
        this.loadouts.push(new Loadout(
            'New Loadout',
            this.mainStore.createSnapshot()
        ))
        this.select(this.loadouts.length - 1)
    }

    saveCurrent(): void {
        this.loadouts[this.selectedIndex].setData(this.mainStore.createSnapshot())
        this.save()
    }

    prepareLoadoutForDropdown(): LoadoutItem[] {
        let items = [
            this.createEmpty()
        ]

        this.loadouts.forEach((i, index) => {items.push(new LoadoutItem(
            index,
            i.name
        ))})

        return items
    }

    createEmpty(): LoadoutItem {
        return new LoadoutItem(
            -1,
            'Create new'
        )
    }

    getSelected(): any {
        return this.selectedIndex == -1
        ? this.createEmpty()
        : new LoadoutItem(
            this.selectedIndex,
            this.loadouts[this.selectedIndex].name
        )
    }

    removeCurrent() {
        if (this.selectedIndex == -1) {
            return
        }

        this.loadouts.splice(this.selectedIndex, 1)
        this.selectedIndex--
        this.save()
    }

    loadLoadout(item: LoadoutItem) {
        if (item.index == -1) {
            this.createNewLoadout()
            this.select(this.loadouts.length - 1)
            this.save()
        } else {
            this.loadByIndex(item.index)
            this.save()
        }
    }

    loadByIndex(index: number) {
        this.select(index)
        let loadout = this.loadouts[index]
        let data = JSON.parse(loadout.data)
        this.mainStore.masteryStore.loadFromObject(data['mastery'])
        this.mainStore.gearStore.loadFromObject(data['gear'])
    }

    changeName(value: string): void {
        let item = this.loadouts[this.selectedIndex]
        item.setName(value)
        this.save()
    }
}