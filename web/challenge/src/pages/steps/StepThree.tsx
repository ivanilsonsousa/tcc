import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepThreeSchema,
  StepThreeData,
  CombinedFormData,
} from "./validationSchemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import NestedCheckboxList from "../NestedCheckboxList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiHelpCircle } from "react-icons/fi";
import api from "@/api";
import ComponentePersonalizado from "../ComponentePersonalizado";

interface StepThreeProps {
  prevStep: () => void;
  nextStep: () => void;
  formData: CombinedFormData;
  setFormData: (data: Partial<CombinedFormData>) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ prevStep, nextStep, formData, setFormData }) => {
  const form = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [data, setData] = useState(null); // Estado para armazenar dados
  const [dimensionsList, setDimensionsList] = useState<any>({});

  const onSubmit = (data: StepThreeData) => {
    setFormData(data);
    nextStep();
  };

  const { errors } = form.formState;

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/evidences", {
        headers: {
          showLoader: false,
        }
      });

      console.log("response", response.data);

      setData(response.data);
    };

    fetchData();
  }, []);

  const handleValueCheckboxListChange = (value: any) => {
    console.log("handleValueCheckboxListChange::", value);
    setDimensionsList(value);
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
          {/* <NestedCheckboxList
            data={data}
            onValueChange={handleValueCheckboxListChange}
          /> */}

          <FormField
            control={form.control}
            name="personalizado.valido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Componente Personalizado</FormLabel>
                <FormControl>
                  {/* <NestedCheckboxList
                    data={data}
                    onValueChange={handleValueCheckboxListChange}
                    {...field}
                  /> */}
                  <ComponentePersonalizado {...field} />
                </FormControl>
                <FormDescription>Componente Personalizado</FormDescription>
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

export default StepThree;