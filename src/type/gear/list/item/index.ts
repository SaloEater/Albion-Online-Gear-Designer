class GearItemTypeList {
    slot: string
    items: string[]

    constructor(slot: string, items: string[]) {
        this.slot = slot
        this.items = items.sort()
    }
}

export default GearItemTypeList