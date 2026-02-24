import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'sonner';
import { APP_BUILD_VERSION } from './version';
import useAuthStore from './store/useAuthStore';

if (import.meta.env.PROD) {
  const savedVersion = useAuthStore.getState().appBuildVersion;

  if (savedVersion && savedVersion !== APP_BUILD_VERSION) {
    console.log('[PWA] New build detected. Clearing cache...');
    if ('caches' in window) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
    useAuthStore.getState().clearAll();
    useAuthStore.getState().setAppBuildVersion(APP_BUILD_VERSION);
    window.location.reload(true);
  } else if (!savedVersion) {
    useAuthStore.getState().setAppBuildVersion(APP_BUILD_VERSION);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0C356A',
          borderRadius: 6,
          colorInfo: '#0C356A',
          colorTextBase: '#1a1a1a',
          sizeUnit: 3,
          wireframe: true,
          controlOutlineWidth: 0,
          fontFamily: 'Nunito Sans'
        },
        components: {
          Table: {
            rowHoverBg: '#B3E5FC'
          }
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
  </React.StrictMode>
);
