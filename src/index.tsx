import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import { openDatabase } from './services/cache';

openDatabase('my-db');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
