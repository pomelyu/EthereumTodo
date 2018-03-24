import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import 'config/config-global-styles';
import 'config/config-web3';
import 'events/todoEvents';

import App from 'containers/App';

// import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
