// import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import App from './app';

// Create a root using the new createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the root object
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
