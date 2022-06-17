import React from "react"
import { PlayerMastery } from "../../component/mastery/player_mastery"
import { CGearSet } from "../../component/gear"
import {inject, observer} from "mobx-react"
import styles from "./styles.module.css"
import { CPrices } from '../../component/prices'
import { CLoadouts } from '../../component/loadout'
import { CLanguage } from '../../component/language'

class MainPageComponent extends React.Component<any, any>
{
    render() {
        return (
            <div>
                <div className={styles.items}>
                    <div className={styles.grid_header}>
                        <div className={styles.language}>
                            <CLanguage/>
                        </div>
                        <div className={styles.loadout}>
                            <CLoadouts/>
                        </div>
                    </div>
                </div>
                <div className={styles.items}>
                    <PlayerMastery />
                    <CGearSet />
                    <CPrices />
                </div>
            </div>
        );
    }
}

export const MainPage = inject(
    "MasteryStore"
)(observer(MainPageComponent));