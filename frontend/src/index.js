import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AdminFestifyEdit from './adminFestifyEdit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminFestifyEdit />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
