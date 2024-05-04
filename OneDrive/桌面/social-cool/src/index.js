import ReactDOM, { createRoot, render } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import React, { useState } from 'react';
// import '@babel/plugin-proposal-private-property-in-object';

// ReactDOM.render(<App />, document.getElementById('root'));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// <React.StrictMode>

// </React.StrictMode>

// reportWebVitals();
