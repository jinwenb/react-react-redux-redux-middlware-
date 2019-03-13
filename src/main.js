import React,{Component} from 'react';
import ReactDom from 'react-dom';
import store from './store/index'
import Counter from "./component/Counter";
import {Provider} from './react-redux/index'
ReactDom.render(
    <Provider store={store}>
<Counter/>
    </Provider>
,root)



