import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from '../reportWebVitals';
import reportHandler from '../reportHandler';
import GlobalFonts from './assets/fonts/fonts';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalFonts />
    <App />
  </React.StrictMode>,
);

reportWebVitals(reportHandler);
