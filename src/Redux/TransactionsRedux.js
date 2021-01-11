import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { FILTER_TYPE } from '../Screens/ModalFilter'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTransactionsRequest: ['data'],
  getTransactionsSuccess: ['payload'],
  getTransactionsFailure: ['error'],

  sortTransactions: ['sort'],
  filterTransactions: ['data'],
})

export const TransactionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transactions: { fetching: false, data: null, error: null, payload: [], temp: [] },
})

/* ------------- Reducers ------------- */

export const getTransactionsRequest = (state, { data }) =>
  state.merge({ ...state, transactions: { ...state.transactions, fetching: true, data } })
export const getTransactionsSuccess = (state, { payload }) => {

  const keys = Object.keys(payload)
  const array1 = keys.map(k => {
    const dateString = payload[k].created_at
    let datetime = dateString

    if (dateString.length > 18) {
      const date = dateString.substring(0, 10);
      const time = dateString.substring(11, 19);
      datetime = `${date}T${time}.000+00:00`
    }
    return {
      ...payload[k],
      created_at: datetime
    }
  }).sort(function (a, b) { return new Date(a.created_at) - new Date(b.created_at) })

  return state.merge({ ...state, transactions: { ...state.transactions, fetching: false, error: null, payload: array1, temp: array1 } })
}
export const getTransactionsFailure = (state, { error }) =>
  state.merge({ ...state, transactions: { ...state.transactions, fetching: false, error } })

export const sortTransactions = (state, { sort }) => {
  const list = state.transactions.payload
  const tempList  = state.transactions.temp
  const transactions = [...list]
  const temp = [...tempList]

  if (sort == FILTER_TYPE.nameAsc) {
    transactions
      .sort(function (a, b) {
        if (a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()) return -1;
        if (a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()) return 1;
        return 0;
      })
    temp
      .sort(function (a, b) {
        if (a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()) return -1;
        if (a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()) return 1;
        return 0;
      })
  } else if (sort == FILTER_TYPE.nameDesc) {
    transactions
      .sort(function (a, b) {
        if (a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()) return -1;
        if (a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()) return 1;
        return 0;
      })
    temp
      .sort(function (a, b) {
        if (a.beneficiary_name.toLowerCase() > b.beneficiary_name.toLowerCase()) return -1;
        if (a.beneficiary_name.toLowerCase() < b.beneficiary_name.toLowerCase()) return 1;
        return 0;
      })
  } else if (sort == FILTER_TYPE.dateAsc) {
    transactions.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
    temp.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at) })
  }
  else if (sort == FILTER_TYPE.dateDesc) {
    transactions.sort(function (a, b) { return new Date(a.created_at) - new Date(b.created_at) })
    temp.sort(function (a, b) { return new Date(a.created_at) - new Date(b.created_at) })
  }

  return state.merge({ ...state, transactions: { ...state.transactions, payload: transactions, temp } })
}

export const filterTransactions = (state, { data }) => {
  const temp = state.transactions.temp

  if (data.length > 0) {
    let filtered = state.transactions.temp
    filtered = filtered.filter(function (d) {
      return d.beneficiary_name.includes(data);
    });

    return state.merge({ ...state, transactions: { ...state.transactions, payload: filtered } })
  }

  return state.merge({ ...state, transactions: { ...state.transactions, payload: temp } })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.GET_TRANSACTIONS_REQUEST]: getTransactionsRequest,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,

  [Types.SORT_TRANSACTIONS]: sortTransactions,
  [Types.FILTER_TRANSACTIONS]: filterTransactions,

})
