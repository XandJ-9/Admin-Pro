import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#4f46e5', // indigo-600
          borderRadius: 8,
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
