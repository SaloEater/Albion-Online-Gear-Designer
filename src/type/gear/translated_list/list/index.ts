import TranslatedGearItemType from "../item"

export default class TranslatedGearItemTypeList {
    slot: string
    items: TranslatedGearItemType[] = []

    constructor(slot: string) {
        this.slot = slot
    }
}