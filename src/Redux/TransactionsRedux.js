import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTransactionsRequest: ['data'],
  getTransactionsSuccess: ['payload'],
  getTransactionsFailure: ['error'],

  sortTransactions: [''],

})

export const TransactionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transactions: { fetching: false, data: null, error: null, payload: null },
})

/* ------------- Reducers ------------- */

export const getTransactionsRequest = (state, { data }) =>
  state.merge({ ...state, transactions: { ...state.transactions, fetching: true, data } })
export const getTransactionsSuccess = (state, { payload }) => {
  return state.merge({ ...state, transactions: { ...state.transactions, fetching: false, error: null, payload } })
}
export const getTransactionsFailure = (state, { error }) =>
  state.merge({ ...state, transactions: { ...state.transactions, fetching: false, error } })

export const sortTransactions = (state, { }) => {
  const transactions = state.transactions.payload || []
  
  console.log('wew 0', transactions)
  const newData = Object.keys(transactions).sort(function (a, b) {
    console.log('wew 1', transactions[a])
    console.log('wew 2', transactions[b])
    return transactions[a].beneficiary_name.toLowerCase() - transactions[b].beneficiary_name.toLowerCase();
  });
  console.log('wew 4', newData)

  return state.merge({ ...state, transactions: { ...state.transactions, fetching: true, payload: newData } })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_TRANSACTIONS_REQUEST]: getTransactionsRequest,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,

  [Types.SORT_TRANSACTIONS]: sortTransactions,

})
