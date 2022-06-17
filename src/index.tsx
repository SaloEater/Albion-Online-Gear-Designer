import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import MainStore from './state';
import { autorun } from 'mobx';
import './i18n';

const mainStore = new MainStore;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <Provider
      MasteryStore={mainStore.masteryStore}
      GearStore={mainStore.gearStore}
      PricesStore={mainStore.pricesStore}
      LoadoutStore={mainStore.loadoutStore}
      LanguageStore={mainStore.languageStore}
    >
      <App />
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
