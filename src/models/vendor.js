import {create}  from '../services/vendors';

export default {
  namespace: 'vendors',
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
