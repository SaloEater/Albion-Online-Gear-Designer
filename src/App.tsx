import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes} from "react-router-dom"
import './App.css';
import {MainPage} from "./page/main";
import { observer } from 'mobx-react';

export default observer(() =>
  <MainPage/>
);
