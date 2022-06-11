import { action, makeObservable, observable } from "mobx"
import IPHelper from "../../../helper/IPHelper"
import ItemHelper from "../../../helper/item_helper"
import GearStore from "../../../state/gear"

class GearItem {
    slot: string
    baseType: string = '?'
    tier: number = 0
    enchantment: number = 0
    store: GearStore
    totalIP: number = 0
    ipHelper: IPHelper = new IPHelper()
    itemHelper: ItemHelper = new ItemHelper()
    manuallyEdited: boolean = false

    constructor(slot: string, store: GearStore) {
        makeObservable(this, {
            slot: observable,
            tier: observable,
            baseType: observable,
            enchantment: observable,
            totalIP: observable,
            setEnchantment: action,
            setTier: action,
            setBaseType: action
        })
        this.slot = slot
        this.store = store
    }
    
    setEnchantment(rate: number): void {
        this.enchantment = this.limitBy(rate, 0, 3)
        this.store.save()
    }

    setTier(spec: number): void {
        if (spec != 0) {
            spec = this.limitBy(spec, 4, 8)
        }
        this.tier = spec
        this.store.save()
    }

    setTierManually(spec: number): void {
        if (spec != 0) {
            spec = this.limitBy(spec, 4, 8)
            this.manuallyEdited = true
        } else {
            this.manuallyEdited = false
        }
        this.tier = spec
        this.store.save()
    }

    setBaseType(baseType: string) {
        this.baseType = baseType
        if (this.slot == 'main hand') {
            this.store.updateTwoHandedStatus(baseType)
        }
        this.store.save()
    }

    isManuallyEdited(): boolean {
        return this.tier != 0
    }

    private limitBy(value: number, min: number, max: number): number {
        return value > max ? max : (value < min ? min : value)
    }

    calculateOwnIP(): void {
        let mastery = this.store.mainStore.masteryStore.playerMastery.getMastery(this.slot)
        let masteryIp = mastery?.getIP() ?? 0
        masteryIp *= this.ipHelper.getTierMasteryModifier(this.tier)
        this.totalIP = masteryIp + this.ipHelper.getIP(this.tier, this.enchantment) + this.itemHelper.getAdditionalIP(this.baseType)
    }
}

export default GearItem