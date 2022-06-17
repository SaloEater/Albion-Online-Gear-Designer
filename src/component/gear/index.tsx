import { inject, observer } from "mobx-react"
import React, { ChangeEvent } from "react"
import { Translation, useTranslation } from "react-i18next"
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
            (i: GearItem, index: number) => <CGearItem key={index} item={i} list={this.gearStore.translatedTypeLists.lists.filter((j) => j.slot == i.slot)[0]}/>
        )

        return (
            <Translation>
                {
                    t => {
                        let twoHanded = this.gearStore.isTwoHanded ? 
                                <div>
                                    {t('gear.two_handed_state')}
                                    <input
                                        type="checkbox"
                                        checked={this.gearStore.isTwoHanded}
                                        readOnly={true}
                                    />
                                </div>
                            : <div></div>
                            
                        return <div>
                            {items}
                            {twoHanded}
                            
                            <div>
                                {t('gear.required_ip')}:
                                <input
                                    type="number"
                                    value={this.gearStore.necessaryIP}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.gearStore.setNecessaryIP(e.target.value)}
                                />
                            </div>
            
                            <div>
                                {t('gear.price')}: {this.gearStore.mainStore.pricesStore.actualCost}
                            </div>
            
                            <div>
                                {t('gear.suggested_ip')}: {this.gearStore.mainStore.pricesStore.actualIP}
                            </div>
            
                            <button
                                onClick={() => this.gearStore.mainStore.pricesStore.calculate(this.gearStore.necessaryIP)}
                                disabled={!this.gearStore.mainStore.pricesStore.isFetched}
                            >{this.gearStore.mainStore.pricesStore.isFetched ? t('gear.calculate') : t('gear.fetch_first')}</button>
                        </div>
                    }
                }
            </Translation>            
        );
    }

}

export const CGearSet = inject(
    "GearStore"
)(observer(GearSetComponent));