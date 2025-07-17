import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/App';
import 'antd/dist/reset.css';
import '@container/style.css';

window.console.log(
  '%c当前环境:' + process.env.NODE_ENV,
  'background-color: yellow;',
  {
    $APP_NAME: $APP_NAME,
    $APP_VERSION: $APP_VERSION,
    $APP_MODE: $APP_MODE,
    $APP_ENV: $APP_ENV,
  }
);

const render = (dom: HTMLElement) => {
  createRoot(dom).render(<App />);
};

render(document.getElementById('app')!);
