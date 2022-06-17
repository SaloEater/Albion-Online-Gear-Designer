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

    createNewLoadout(t: any) {
        let newName = t('loadout.default_name');
        let regex = new RegExp(newName + " \\((\\d+)\\)", 'g')
        let numbers = this.loadouts.map((i) => regex.exec(i.name)).filter((i) => i ? i.length >= 2 : false).map((i) => i ? parseInt(i[1]) : 0)
        
        if (numbers.length > 0) {            
            let maxNumber = Math.max(...numbers)

            if (maxNumber == 0) {
                newName += ' (1)'   
            }

            if (maxNumber > 0) {
                newName += ' (' + (maxNumber + 1)  + ')'
            }
        }

        this.loadouts.push(new Loadout(
            newName,
            this.mainStore.createSnapshot()
        ))
        this.select(this.loadouts.length - 1)
    }

    saveCurrent(): void {
        this.loadouts[this.selectedIndex].setData(this.mainStore.createSnapshot())
        this.save()
    }

    prepareLoadoutForDropdown(t: any): LoadoutItem[] {
        let items = [
            this.createEmpty(t)
        ]

        this.loadouts.forEach((i, index) => {items.push(new LoadoutItem(
            index,
            i.name
        ))})

        return items
    }

    createEmpty(t: any): LoadoutItem {
        return new LoadoutItem(
            -1,
            t('loadout.create_new')
        )
    }

    getSelected(t: any): any {
        return this.selectedIndex == -1
        ? this.createEmpty(t)
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
        if (this.loadouts.length < this.selectedIndex + 1) {
            this.selectedIndex--
        }
        this.save()
    }

    loadLoadout(item: LoadoutItem, t: any) {
        if (item.index == -1) {
            this.createNewLoadout(t)
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