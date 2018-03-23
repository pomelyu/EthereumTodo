import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'config/config-web3';
import 'events/todoEvents';

import App from 'containers/App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
