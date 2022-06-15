import {action, makeObservable, observable} from "mobx"

export default class Loadout {
    name: string
    data: string

    constructor(name: string, data: string) {
        makeObservable(this, {
            name: observable,
            data: observable,
            setName: action,
            setData: action
        })
        this.name = name
        this.data = data
    }

    setName(name: string) {
        this.name = name
    }

    setData(data: string) {
        this.data = data
    }
}