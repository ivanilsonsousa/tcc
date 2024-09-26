import React from 'react';

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <ol className="flex flex-col lg:flex-row items-justify w-full space-y-4 lg:space-x-8 lg:space-y-0">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        const borderColor = isActive ? 'border-slate-600' : isCompleted ? 'border-slate-300' : 'border-gray-200';

        const textColor = isActive || isCompleted ? 'text-slate-600' : 'text-gray-400';

        return (
          <li key={index} className="flex-1">
            <div
              className={`border-l-2 lg:border-l-0 lg:border-t-2 flex flex-col pl-4 lg:pt-4 lg:pl-0 ${borderColor}`}
            >
              <span className={`text-sm lg:text-base ${textColor}`}>
                {`Passo ${stepNumber}`}
              </span>
              <h4 className="text-base lg:text-lg text-gray-900">
                {step.title}
              </h4>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
