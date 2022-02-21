import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/Store'

import App from './App'
import Footer from './Components/Footer/Footer'

// console.log('Rendering App')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('main-root'),
)
// console.log(store.getState())

ReactDOM.render(<Footer />, document.getElementById('footer'));
