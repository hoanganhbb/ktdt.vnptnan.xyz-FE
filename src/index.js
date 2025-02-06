import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: ' #0C356A',
        borderRadius: 6,
        colorInfo: ' #0C356A',
        colorTextBase: '#1a1a1a',
        sizeUnit: 3,
        wireframe: true,
        controlOutlineWidth: 0,
        rowHoverBg: '#B3E5FC',
        fontFamily: 'Nunito Sans'

        // Alias Token
        // colorBgContainer: '#f6ffed'
      }
    }}
  >
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors expand={false} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
