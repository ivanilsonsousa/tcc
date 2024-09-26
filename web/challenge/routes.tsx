import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MultiStepForm from './src/pages/steps/MultiStepForm';
import { ViewMarkdown } from '@/pages/test/ViewMarkdown';
import { Result } from '@/pages/Result';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MultiStepForm />} />
      <Route path="/result" element={<Result />} />
      <Route path="/markdown" element={<ViewMarkdown />} />
    </Routes>
  );
};

export default AppRoutes;
