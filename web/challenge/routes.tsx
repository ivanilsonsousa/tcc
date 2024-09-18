import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormPage } from './src/pages/Form';
import { Result } from './src/pages/Result';
import MultiStepForm from './src/pages/steps/MultiStepForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/result" element={<Result />} />
      <Route path="/steps" element={<MultiStepForm />} />
    </Routes>
  );
};

export default AppRoutes;
