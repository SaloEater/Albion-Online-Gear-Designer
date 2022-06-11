import { inject, observer } from "mobx-react"
import React, { ChangeEvent } from "react"
import GearStore from "../../state/gear"
import GearItem from "../../type/gear/item"
import GearItemTypeList from "../../type/gear/list/item"
import CGearItem from "./item"

class GearSetComponent extends React.Component {
    gearStore: GearStore

    constructor(props: any) {
        super(props)
        this.gearStore = props.GearStore
    }

    render(): React.ReactNode {

        let items = this.gearStore.getActualItemSet().map(
            (i: GearItem, index: number) => <CGearItem key={index} item={i} list={this.gearStore.baseTypeLists.lists.filter((j: GearItemTypeList) => j.slot == i.slot)[0]}/>
        )

        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.gearStore.isTwoHanded}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.gearStore.setTwoHanded(e.target.checked)}
                />
                {items}
                
                <input
                    type="number"
                    value={this.gearStore.necessaryIP}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.gearStore.setNecessaryIP(e.target.value)}
                />

                <div>
                    Price: {this.gearStore.mainStore.pricesStore.actualCost}
                </div>

                <div>
                    Suggested IP: {this.gearStore.mainStore.pricesStore.actualIP}
                </div>

                <button
                    onClick={() => this.gearStore.mainStore.pricesStore.calculate(this.gearStore.necessaryIP)}
                >Calculate</button>
            </div>
        );
    }

}

export const CGearSet = inject(
    "GearStore"
)(observer(GearSetComponent));