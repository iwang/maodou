import {create}  from '../services/products';

export default {
  namespace: 'products',
  state: {

  },
  reducers: {

  },
  effects: {
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
    }
  },
  subscriptions: {},
};
