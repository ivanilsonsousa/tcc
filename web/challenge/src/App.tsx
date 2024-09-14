import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './../routes';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from '@/components/custom/LoadingOverlay';
import { useAxiosInterceptor } from '@/api';

const AxiosInterceptorSetup: React.FC = () => {
  useAxiosInterceptor();

  return null;
};

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <Router>
        <LoadingOverlay />
        <AxiosInterceptorSetup />
        <AppRoutes />
      </Router>
    </LoadingProvider>
  );
};

export default App;
