import { computed } from "mobx";
import {inject, observer} from "mobx-react";
import React, {ChangeEvent, ReactNode} from "react";
import withRouter from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MasteryStore from "../../../state/mastery"
import { ItemMastery } from "../../../type/mastery/item";
import { ItemTypeMastery } from "../../../type/mastery/type";
import CItemTypeMastery from "../item_type_mastery"
import styles from "./styles.module.css"

class PlayerMasteryComponent extends React.Component {
    masteryStore: MasteryStore

    constructor(props: any) {
        super(props)
        this.masteryStore = props.MasteryStore
    }

    render(): React.ReactNode {
        
        let masteries = this.masteryStore.playerMastery.getActualMasteries()

        let tabLists: ReactNode[] = []
        let tabPanels: ReactNode[] = []

        masteries.forEach((i: ItemTypeMastery, index: number) => {
            tabLists.push(<Tab key={index}>{i.slot}</Tab>)
            tabPanels.push(<TabPanel key={index}><CItemTypeMastery itemTypeMastery={i}/></TabPanel>)
        })

        return (
            <div>
                <button
                    onClick={() => this.masteryStore.clearCache()}
                >Clear</button>
                
                <Tabs>
                    <TabList>
                        {tabLists}
                    </TabList>
                    
                    {tabPanels}
                </Tabs>
            </div>
        );
    }

}

export const PlayerMastery = inject(
    "MasteryStore"
)(observer(PlayerMasteryComponent));