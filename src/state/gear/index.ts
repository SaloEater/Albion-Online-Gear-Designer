import { action, makeObservable, observable } from 'mobx'
import MainStore from '..'
import GearItem from '../../type/gear/item'
import GearItemTypeLists from '../../type/gear/list'
import GearItemTypeList from '../../type/gear/list/item'

class GearStore {
    itemSet: GearItem[] = []
    isTwoHanded: boolean = false
    baseTypeLists: GearItemTypeLists = new GearItemTypeLists()
    necessaryIP: number = 0
    mainStore: MainStore

    constructor(mainStore: MainStore) {
        makeObservable(this, {
            itemSet: observable,
            isTwoHanded: observable,
            necessaryIP: observable,
            setTwoHanded: action,
            updateTwoHandedStatus: action,
            setNecessaryIP: action
        })
        this.itemSet.push(new GearItem('helmet', this))
        this.itemSet.push(new GearItem('cape', this))
        this.itemSet.push(new GearItem('body armour', this))
        this.itemSet.push(new GearItem('boots', this))
        this.itemSet.push(new GearItem('main hand', this))
        this.itemSet.push(new GearItem('offhand', this))
        this.load()
        this.mainStore = mainStore
    }

    save() {
        let itemSet = this.itemSet.map(
            (i: GearItem) => [i.slot, i.tier, i.enchantment, i.baseType, i.manuallyEdited]
        )

        localStorage.setItem('gearStore.itemSet', JSON.stringify(itemSet))
        this.saveIP()
    }

    load() {
        let itemSet: any[] = JSON.parse(localStorage.getItem('gearStore.itemSet') ?? '[]')
        itemSet.forEach(
            (i) => {
                let slot = i[0]
                let tier = i[1]
                let enchantment = i[2]
                let baseType = i[3]
                let manuallyEdited = i[4]
                this.itemSet.filter((j: GearItem) => j.slot == slot).forEach((k: GearItem) => {
                    k.tier = tier
                    k.enchantment = enchantment
                    k.baseType = baseType
                    this.isTwoHanded = this.isTwoHanded || this.isTwoHandedItem(baseType)
                    k.manuallyEdited = manuallyEdited
                })
            }
        )
        this.necessaryIP = parseInt(localStorage.getItem('gearStore.necessaryIP') ?? '0')
    }

    clearCache() {  
        localStorage.removeItem('gearStore.itemSet')
    }

    setTwoHanded(twoHanded: boolean) {
        this.isTwoHanded = twoHanded
    }

    getActualItemSet(): GearItem[] {
        return this.itemSet.filter((i: GearItem) => !this.isTwoHanded || i.slot != 'offhand')
    }

    isTwoHandedItem(baseType: string): boolean {
        return baseType.startsWith('2H_')
    }

    updateTwoHandedStatus(baseType: string) {
        this.setTwoHanded(this.isTwoHandedItem(baseType))
    }

    getBaseTypeForSlot(slot: string) {
        return this.itemSet.find((i: GearItem) => i.slot == slot)?.baseType ?? ''
    }

    setNecessaryIP(rawIp: string) {
        let ip = Math.floor(parseInt(rawIp) ?? 0)
        this.necessaryIP = ip
        this.saveIP()
    }

    saveIP() {
        localStorage.setItem('gearStore.necessaryIP', JSON.stringify(this.necessaryIP))
    }
}

export default GearStore