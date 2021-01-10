import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import MainStackNavigator from './src/Navigation'

import { fetchTransactions } from './src/Sagas/';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  require('./src/Redux/TransactionsRedux').reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(fetchTransactions);

export default function App() {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
}