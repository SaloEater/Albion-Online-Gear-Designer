import names from './names.json'
import items from './localization.json'

export default class FormatTranslations {
    constructor() {
        let a: any = items
        let b = a.tmx.body.tu
        let newNames = names.map((i) => '@ITEMS_T4_' + i)
        let result: any[] = [];
        b.forEach((i: {t_name: string, tuv: {lang: string, seg: string}}) => {
            let name: string = i.t_name
            let entry = newNames.filter((j) => j == name);
            if (entry.length > 0) {
                result.push({
                    translations: i.tuv,
                    name: name.slice(10, name.length)
                })
            }
        })
        console.log(JSON.stringify(result))
    }
}