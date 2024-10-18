import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


const supabase = createClient(
  "https://noyxpsalqwdvyfisvzpu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5veXhwc2FscXdkdnlmaXN2enB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzODI0NTIsImV4cCI6MjAzODk1ODQ1Mn0.zgbcvlnaLVqTapitCjRBVphh-eDMtoycct8o_pJI7Yo" 
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals






