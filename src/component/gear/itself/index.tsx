import { inject, observer } from "mobx-react"
import React, { ChangeEvent } from "react"
import GearStore from "../../../state/gear"
import CGearItem from "../item"
import GearItem from "../../../type/gear/item"

export default observer((input: {gearStore: GearStore, t: any}) => {
    let items = input.gearStore.getActualItemSet().map(
        (i: GearItem, index: number) => <CGearItem key={index} item={i} list={input.gearStore.translatedTypeLists.lists.filter((j) => j.slot == i.slot)[0]}/>
    )

    let twoHanded: React.ReactNode = input.gearStore.isTwoHanded ? 
        <div>
            {input.t('gear.two_handed_state')}
            <input
                type="checkbox"
                checked={input.gearStore.isTwoHanded}
                readOnly={true}
            />
        </div>
    : <div></div>
        
    return (<div>
        {items}
        {twoHanded}
        
        <div>
            {input.t('gear.required_ip')}:
            <input
                type="number"
                value={input.gearStore.necessaryIP}
                onChange={(e: ChangeEvent<HTMLInputElement>) => input.gearStore.setNecessaryIP(e.target.value)}
            />
        </div>

        <div>
            {input.t('gear.price')}: {input.gearStore.mainStore.pricesStore.actualCost}
        </div>

        <div>
            {input.t('gear.suggested_ip')}: {input.gearStore.mainStore.pricesStore.actualIP}
        </div>

        <button
            onClick={() => input.gearStore.mainStore.pricesStore.calculate(input.gearStore.necessaryIP)}
            disabled={!input.gearStore.mainStore.pricesStore.isFetched}
        >{input.gearStore.mainStore.pricesStore.isFetched ? input.t('gear.calculate') : input.t('gear.fetch_first')}</button>
    </div>)
})