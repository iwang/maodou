import {create} from '../services/orders'
import {query as productsQuery} from '../services/products'

export default {
  namespace: 'orders',
  state: {
    products: []
  },
  reducers: {
    productsQuerySuccess(state, action) {
      const {list} = action.payload
      return {
        ...state,
        products: list
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'productsQuery',
            payload: location.query
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
    }
  }
};
