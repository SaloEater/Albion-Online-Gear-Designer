import { makeAutoObservable } from "mobx"
import { useTranslation } from "react-i18next"
import MainStore from ".."
import GearItemTypeLists from "../../type/gear/list"
import TranslatedGearItemTypeLists from "../../type/gear/translated_list"
import TranslatedGearItemType from "../../type/gear/translated_list/item"
import TranslatedGearItemTypeList from "../../type/gear/translated_list/list"
import Language from "../../type/language"
import names from './names.json'
import i18n from '../../i18n.js'

export default class LanguageStore {
    language: string = 'EN-US'
    languages: Language[] = []
    store: MainStore

    constructor(store: MainStore) {
        makeAutoObservable(this)
        this.languages.push(new Language('English', 'EN-US'))
        this.languages.push(new Language('Deutsch', 'DE-DE'))
        this.languages.push(new Language('Français', 'FR-FR'))
        this.languages.push(new Language('Русский', 'RU-RU'))
        this.languages.push(new Language('Polski', 'PL-PL'))
        this.languages.push(new Language('Español', 'ES-ES'))
        this.languages.push(new Language('Português', 'PT-BR'))
        this.languages.push(new Language('中國人', 'ZH-CN'))
        this.languages.push(new Language('한국인', 'KO-KR'))
        this.store = store
        this.updateGearTranslations()
    }

    getCurrentLanguage(): Language {
        return this.languages.find((i) => i.language == this.language) ?? new Language('Unknown language', '')
    }

    setLanguage(language: Language) {
        if (this.language === language.language) {
            return 
        }

        this.language = language.language
        this.updateGearTranslations()
        i18n.changeLanguage(this.language)
    }

    updateGearTranslations() {
        this.store.gearStore.updateTranslations(this.translateBaseTypes(this.store.gearStore.baseTypeLists))
    }

    translateBaseTypes(baseTypeLists: GearItemTypeLists): TranslatedGearItemTypeLists {
        let lists = new TranslatedGearItemTypeLists()
        baseTypeLists.lists.forEach((i) => {
            let list = new TranslatedGearItemTypeList(i.slot)
            i.items.forEach((j) => {
                let translations = names.find((k) => k.name == j)?.translations
                list.items.push(new TranslatedGearItemType(j, this.getTranslation(translations ?? [],  j) ?? j))
            })
            list.items.sort((a, b) => a.translation > b.translation ? 1 : (b.translation > a.translation ? -1 : 0))
            lists.lists.push(list)
        })

        return lists
    }

    getTranslation(translations: { lang: string; seg: string }[], type: string): string {
        let result = translations.find((i) => i.lang == this.language)?.seg        

        if (result === null) {
            console.log('No translation for type ' + type)
        }

        return result ?? type
    }
}