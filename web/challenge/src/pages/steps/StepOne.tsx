import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema, StepOneData, CombinedFormData } from './validationSchemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface StepOneProps {
  nextStep: () => void;
  formData: CombinedFormData;
  setFormData: (data: Partial<CombinedFormData>) => void;
}

const StepOne: React.FC<StepOneProps> = ({ nextStep, formData, setFormData }) => {
  const form = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      general_context: formData.general_context || '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: StepOneData) => {
    setFormData(data);
    nextStep();
  };

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          control={form.control}
          name="general_context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contexto Geral</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva" rows={12} {...field} />
              </FormControl>
              <FormDescription>
                Descreva de forma geral sobre o desafio proposto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-10">
          <Button type="submit">Próximo</Button>
        </div>
      </form>
    </Form>
  );
};

export default StepOne;
