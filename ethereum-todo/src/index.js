import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';

import './config/web3_config';
import './events/todo_events';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
