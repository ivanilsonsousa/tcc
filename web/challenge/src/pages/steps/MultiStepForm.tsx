import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Confirm from './Confirm';
import StepIndicator from './StepIndicator';
import { CombinedFormData } from './validationSchemas';
import StepThree from './StepThree';

const initialFormData: CombinedFormData = {
  general_context: `O pensamento computacional é uma habilidade essencial que permite resolver problemas de forma sistemática e eficiente, aplicando conceitos fundamentais da ciência da computação. Um dos desafios comuns para praticar essa habilidade é o cálculo de médias, uma operação simples, mas fundamental, que exige atenção aos detalhes e uma boa compreensão de como os dados devem ser manipulados e interpretados.

Descrição do Desafio: Você é responsável por desenvolver um programa que calcule a média das notas de uma turma de alunos. Este programa deve receber como entrada as notas individuais de cada aluno e, em seguida, calcular e exibir a média da turma. Além disso, o programa deve indicar quantos alunos estão acima, abaixo e na média da turma.`,
  files: undefined,
  nestedCheckboxes: {},
};

const steps = [
  { title: 'Contexto Geral', description: 'Descreva o Contexto Geral' },
  { title: 'Envio do Código', description: 'Submeta o código criado' },
  { title: 'Dimensões', description: 'Escolha os itens a serem avaliados' },
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
