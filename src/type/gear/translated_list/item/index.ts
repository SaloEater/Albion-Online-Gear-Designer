export default class TranslatedGearItemType {
    type: string
    translation: string

    constructor(type: string, translation: string) {
        this.translation = translation
        this.type = type
    }
}