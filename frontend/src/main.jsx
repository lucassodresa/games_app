import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { queryClient } from './services/queryClient';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
);
