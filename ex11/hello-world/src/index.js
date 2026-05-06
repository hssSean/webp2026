import React from 'react';
import ReactDOM from 'react-dom'; // 這裡改回舊版的 react-dom，沒有 /client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();