import {observer} from "mobx-react";
import { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MasteryStore from "../../../../state/mastery"
import { ItemTypeMastery } from "../../../../type/mastery/type";
import CItemTypeMastery from "../../item_type_mastery"

export default observer((input: {masteryStore: MasteryStore, t: any}) => {
    let masteries = input.masteryStore.playerMastery.getActualMasteries().filter((i) => i.slot !== 'cape')

    let tabLists: ReactNode[] = []
    let tabPanels: ReactNode[] = []

    masteries.forEach((i: ItemTypeMastery, index: number) => {
        let itemName = input.t('gear_type.' + i.slot)
        let name: React.ReactNode = (<div>{itemName}</div>)
        if (index == input.masteryStore.selectedTabIndex) {
            name = <b>{itemName}</b>
        }
        tabLists.push(<Tab key={index}>{name}</Tab>)
        tabPanels.push(<TabPanel key={index}><CItemTypeMastery itemTypeMastery={i}/></TabPanel>)
    })

    return <div>
        <button
            onClick={() => input.masteryStore.clearCache()}
        >{input.t('mastery.clear_all_data')}</button>
        
        <Tabs
            onSelect={(i) => input.masteryStore.setIndex(i)}
        >
            <TabList>
                {tabLists}
            </TabList>
            
            {tabPanels}
        </Tabs>
    </div>
})