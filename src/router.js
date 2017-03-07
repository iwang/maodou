import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}
//https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md
//https://github.com/ReactTraining/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, {component: require('./routes/dashboard')})
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            }, 'dashboard')
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users'))
            }, 'users')
          }
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            }, 'ui-ico')
          }
        }, {
          path: 'ui/search',
          name: 'ui/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'))
            }, 'ui-search')
          }
        }, {
          path: 'product',
          name: 'product',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/product'))
              cb(null, require('./routes/product'))
            }, 'products')
          }
        }, {
          path: 'vendor',
          name: 'vendor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/vendor'))
              cb(null, require('./routes/vendor'))
            }, 'vendors')
          }
        },{
          path: 'order',
          name: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order'))
            }, 'order')
          }
        },{
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            }, 'error')
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />;
}
