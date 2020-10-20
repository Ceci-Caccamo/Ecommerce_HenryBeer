import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import beerReducer from '../beer'
import categoryReducer from '../category'
import carritoReducer from '../Carrito'
import usersReducer from '../user'

const rootReducer = combineReducers({
    beer: beerReducer,
    category: categoryReducer,
    carrito: carritoReducer,
    user: usersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    return store;
}