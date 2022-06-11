import React from "react"
import { PlayerMastery } from "../../component/mastery/player_mastery"
import { CGearSet } from "../../component/gear"
import {inject, observer} from "mobx-react"
import styles from "./styles.module.css"
import { CPrices } from '../../component/prices'

class MainPageComponent extends React.Component<any, any>
{
    render() {
        return (
            <div className={styles.items}>
                <PlayerMastery />
                <CGearSet />
                <CPrices />
            </div>
        );
    }
}

export const MainPage = inject(
    "MasteryStore"
)(observer(MainPageComponent));