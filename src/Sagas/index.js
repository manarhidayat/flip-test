import {call, put, takeLatest} from 'redux-saga/effects';

import TransactionsActions, { TransactionsTypes } from '../Redux/TransactionsRedux'

export function* fetchTransactions() {
  yield takeLatest(TransactionsTypes.GET_TRANSACTIONS_REQUEST, fetchData);
}

let getTransactions = async () => {
  try {
    const response = await fetch(
      `https://nextar.flip.id/frontend-test `,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.json();
  } catch (error) {
    console.log('error', error);
  }
};

export function* fetchData(action) {
  try {
    const response = yield call(getTransactions, );
    // console.log('result', response);
    yield put(TransactionsActions.getTransactionsSuccess(response));
  } catch (error) {
    console.log('error', error);
    yield put(TransactionsActions.getTransactionsFailure(response));
  }
}
