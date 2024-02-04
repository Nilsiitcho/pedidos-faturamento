import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {defineCustomElements} from "item-lista/loader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

defineCustomElements(window);