import {createStore, combineReducers, applyMiddleware} from '../rudux/index'
import counter from '../reducers/countr'
import {thunk,PromiseWare} from '../middleWare'

let store =createStore(combineReducers({counter}),null,
    applyMiddleware(thunk,PromiseWare)
    );


window.store = store;
export default store;