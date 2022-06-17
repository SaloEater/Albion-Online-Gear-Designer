import { inject, observer } from "mobx-react";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
import LanguageStore from '../../state/language'
import Language from "../../type/language"

class LanguageComponent extends React.Component {

    languageStore: LanguageStore

    constructor(props: any) {
        super(props)
        this.languageStore = props.LanguageStore
    }

    render(): React.ReactNode {
        return (
            <Multiselect
                singleSelect={true}
                options={this.languageStore.languages}
                onSelect={(l: any, i: Language) => {
                    this.languageStore.setLanguage(i)
                }}
                displayValue='name'
                selectedValues={[
                    this.languageStore.getCurrentLanguage()
                ]}
            />
        )
    }
}

export const CLanguage = inject(
    "LanguageStore"
)(observer(LanguageComponent));