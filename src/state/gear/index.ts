import { action, makeObservable, observable } from 'mobx'
import MainStore from '..'
import GearItem from '../../type/gear/item'
import GearItemTypeLists from '../../type/gear/list'
import GearItemTypeList from '../../type/gear/list/item'
import TranslatedGearItemTypeLists from '../../type/gear/translated_list'

class GearStore {
    itemSet: GearItem[] = []
    isTwoHanded: boolean = false
    baseTypeLists: GearItemTypeLists = new GearItemTypeLists()
    translatedTypeLists: TranslatedGearItemTypeLists = new TranslatedGearItemTypeLists()
    necessaryIP: number = 0
    mainStore: MainStore

    constructor(mainStore: MainStore) {
        makeObservable(this, {
            itemSet: observable,
            isTwoHanded: observable,
            necessaryIP: observable,
            translatedTypeLists: observable,
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
        this.mainStore = mainStore
        this.load()
    }

    updateTranslations(lists: TranslatedGearItemTypeLists) {
        this.translatedTypeLists = lists
    }

    save() {
        localStorage.setItem('gearStore.itemSet', this.createItemSetSnapshot())

        this.saveIP()
    }

    createItemSetSnapshot(): string {
        return JSON.stringify(this.itemSet.map(
            (i: GearItem) => [i.slot, i.tier, i.enchantment, i.baseType, i.manuallyEdited]
        ))
    }

    load() {
        this.loadItemSet(localStorage.getItem('gearStore.itemSet'))
        this.loadNecessaryIP(localStorage.getItem('gearStore.necessaryIP'))
    }
    
    loadItemSet(data: string|null) {
        let itemSet: any[] = JSON.parse(data ?? '[]')
        itemSet.forEach(
            (i) => {
                let slot = i[0]
                let tier = i[1]
                let enchantment = i[2]
                let baseType = i[3]
                let manuallyEdited = i[4]
                this.itemSet.filter((j: GearItem) => j.slot == slot).forEach((k: GearItem) => {
                    k.manuallyEdited = manuallyEdited
                    if (manuallyEdited) {
                        k.setTier(tier)
                        k.setEnchantment(enchantment)
                    } else {
                        k.setTier(0)
                        k.setEnchantment(0)
                    }
                    k.setBaseType(baseType)
                    this.setTwoHanded(this.isTwoHanded || this.isTwoHandedItem(baseType))
                })
            }
        )
        this.mainStore.pricesStore.setNonFetched()
    }

    loadNecessaryIP(data: string | null) {
        this.necessaryIP = parseInt(data ?? '0')
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
        localStorage.setItem('gearStore.necessaryIP', this.createNecesssaryIPSnapshot())
    }

    createNecesssaryIPSnapshot(): string {
        return JSON.stringify(this.necessaryIP)
    }

    createSnapshot() {
        return JSON.stringify({
            itemSet: this.createItemSetSnapshot(),
            necessaryIP: this.createNecesssaryIPSnapshot()
        })
    }

    loadFromObject(data: any) {
        data = JSON.parse(data)
        this.loadItemSet(data.itemSet)
        this.loadNecessaryIP(data.necessaryIP)
    }

    calculateOwnIPs() {
        this.itemSet.forEach((i) => i.calculateOwnIP())
    }
}

export default GearStore