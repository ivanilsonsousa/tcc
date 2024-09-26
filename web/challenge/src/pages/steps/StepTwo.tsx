import NestedCheckboxList from "@/components/custom/NestedCheckboxList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiHelpCircle } from "react-icons/fi";
import {
  CombinedFormData,
  StepTwoData,
  stepTwoSchema,
} from "./validationSchemas";

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
      params: formData.params || {
        dimensions: [],
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: StepTwoData) => {
    setFormData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Alert className='mb-5' >
          <FiHelpCircle className="h-4 w-4" />
          <AlertTitle>Sobre</AlertTitle>
          <AlertDescription>
            Escolha dentre as opções de análise para o desafio submetido
          </AlertDescription>
        </Alert>

        <div className="mt-2">
          <FormField
            control={form.control}
            name="params"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NestedCheckboxList {...field} />
                </FormControl>
                <FormDescription>Os indícios selecionados serão usados para a avaliação</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between mt-10">
          <Button type="button" onClick={prevStep} variant={"secondary"}>
            Voltar
          </Button>
          <Button type="submit">Próximo</Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;