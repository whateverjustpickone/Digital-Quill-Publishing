// src/renderer/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Create root element if it doesn't exist
const rootElement = document.getElementById('root') || document.createElement('div');
if (!document.getElementById('root')) {
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

// Render the app
ReactDOM.render(<App />, rootElement);