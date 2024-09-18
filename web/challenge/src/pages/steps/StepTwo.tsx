import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema, StepTwoData, CombinedFormData } from './validationSchemas';
import { FiInfo } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import FileUpload from '@/components/custom/FileUpload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StepTwoProps {
  prevStep: () => void;
  nextStep: () => void;
  formData: CombinedFormData;
  setFormData: (data: Partial<CombinedFormData>) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ prevStep, nextStep, formData, setFormData }) => {
  const form = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      files: formData.files || undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: StepTwoData) => {
    setFormData(data);
    nextStep();
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    // Aqui você pode adicionar lógica para fazer upload para o servidor
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Alert className='mb-5' >
          <FiInfo className="h-4 w-4" />
          <AlertTitle>Aviso!</AlertTitle>
          <AlertDescription>
            No momento só são aceitos códigos escritos em python 👨‍💻🐍
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Envio do Código</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  // multiple={false}
                  accept={{ 'text/x-python': ['.py'] }}
                  maxSize={5242880}
                  name="files"
                />
              </FormControl>
              <FormDescription>Envie um arquivo .py</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-10">
          <Button
            type="button"
            onClick={prevStep}
            variant={'secondary'}
          >
            Voltar
          </Button>
          <Button type="submit">Próximo</Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;
