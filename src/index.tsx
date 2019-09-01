import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, combineReducers} from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import * as reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	combineReducers(reducers),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
