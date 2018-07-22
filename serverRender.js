import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './config/store';
import App from './src/App';

const serverRender = req => ReactDomServer.renderToString(
  <StaticRouter location={req.url} context={{}}>
    <Provider store={store}>
      <App />
    </Provider>
  </StaticRouter>);

export default serverRender;
