import {create} from '../services/orders'
import {query as productsQuery} from '../services/products'
import {query as vendorsQuery} from '../services/vendors'

export default {
  namespace: 'orders',
  state: {
    products: [],
    vendors: []
  },
  reducers: {
    productsQuerySuccess(state, action) {
      const {list} = action.payload
      return {
        ...state,
        products: list
      }
    },
    vendorsQuerySuccess(state, action) {
      const {list} = action.payload
      return {
        ...state,
        vendors: list
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'productsQuery',
            payload: {}
          })
          dispatch({
            type: 'vendorsQuery',
            payload: {}
          })
        }
      })
    }
  },
  effects: {
    *productsQuery({ payload }, { call, put }) {
      const data = yield call(productsQuery, payload);
      if (data.success) {
        yield put({
          type: 'productsQuerySuccess',
          payload: {
            list: data.payload
          }
        })
      }
    },
    *vendorsQuery({payload}, {call, put}) {
      const data = yield call(vendorsQuery, payload);
      if (data.success) {
        yield put({
          type: 'vendorsQuerySuccess',
          payload: {
            list: data.payload
          }
        })
      }
    }
  }
};
