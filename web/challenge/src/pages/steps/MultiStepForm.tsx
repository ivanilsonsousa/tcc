import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Confirm from './Confirm';
import { CombinedFormData } from './validationSchemas';
import StepThree from './StepThree';
import StepIndicator from '@/components/custom/StepIndicator';

const initialFormData: CombinedFormData = {
  general_context: ``,
  files: undefined,
};

const steps = [
  { title: 'Contexto Geral', description: 'Descreva o Contexto Geral' },
  { title: 'Dimensões', description: 'Escolha os itens a serem avaliados' },
  { title: 'Envio do Código', description: 'Submeta o código criado' },
  { title: 'Confirmação', description: 'Confirme seus dados' },
];

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CombinedFormData>(initialFormData);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFormData = (data: Partial<CombinedFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <StepIndicator currentStep={step} steps={steps} />
      <div className="mt-8">
        {step === 1 && (
          <StepOne nextStep={nextStep} formData={formData} setFormData={handleFormData} />
        )}
        {step === 2 && (
          <StepTwo
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={handleFormData}
          />
        )}
        {step === 3 && (
          <StepThree
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={handleFormData}
          />
        )}
        {step === 4 && <Confirm prevStep={prevStep} formData={formData} />}
        {step > 4 && <div>Formulário concluído!</div>}
      </div>
    </div>
  );
};

export default MultiStepForm;
