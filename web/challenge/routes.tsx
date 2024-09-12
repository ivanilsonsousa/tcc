import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormPage } from './src/pages/Form';
import { Result } from './src/pages/Result';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default AppRoutes;
