import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="1079476190023-esoodjheb0blodtroofvlo4dba3of03k.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();