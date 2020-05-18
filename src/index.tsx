import '@patternfly/react-core/dist/styles/base.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './modules/sample/blog/components/App'
import store from './modules/sample/blog/store'
import * as serviceWorker from './serviceWorker'

// for debugging
(window as any).store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
