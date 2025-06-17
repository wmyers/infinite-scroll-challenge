import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/page';
import Layout from './app/layout';
import './app/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
);
