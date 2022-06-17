import { computed } from "mobx";
import {inject, observer} from "mobx-react";
import React, {ChangeEvent, ReactNode} from "react";
import { Translation, useTranslation } from "react-i18next";
import withRouter from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MasteryStore from "../../../state/mastery"
import { ItemMastery } from "../../../type/mastery/item";
import styles from "./styles.module.css"
import PlayerMasteryC from './itself'

class PlayerMasteryComponent extends React.Component {
    masteryStore: MasteryStore

    constructor(props: any) {
        super(props)
        this.masteryStore = props.MasteryStore
    }

    render(): React.ReactNode {        
        return (
            <Translation>
                {
                    t => <PlayerMasteryC masteryStore={this.masteryStore} t={t}/>
                }
            </Translation>
        );
    }

}

export const PlayerMastery = inject(
    "MasteryStore"
)(observer(PlayerMasteryComponent));