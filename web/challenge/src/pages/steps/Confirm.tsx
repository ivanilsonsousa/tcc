import { Button } from '@/components/ui/button';
import { CombinedFormData } from './validationSchemas';

interface ConfirmProps {
  prevStep: () => void;
  formData: CombinedFormData;
}

const Confirm: React.FC<ConfirmProps> = ({ prevStep, formData }) => {
  const handleSubmit = () => {
    // Lógica para submissão final
    console.log('Dados submetidos:', formData);
    // Aqui você pode enviar os dados para o servidor
  };

  return (
    <div>
      <h2>Confirme seus dados</h2>

      <div className='w-full bg-zinc-300 overflow-y-auto' >
        <pre>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <div className="flex justify-between mt-10">
        <Button type="button" variant={'secondary'} onClick={prevStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Confirmar e Enviar
        </Button>
      </div>
    </div>
  );
};

export default Confirm;