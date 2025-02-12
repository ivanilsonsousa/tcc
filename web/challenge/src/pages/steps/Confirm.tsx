import { ConfirmModal } from "@/components/custom/Modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmPreview from "../confirm-preview";
import { CombinedFormData, StepConfirmData, stepConfirmSchema } from "./validationSchemas";
import { objectToFormData } from "@/utils";
import api from "@/api";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConfirmProps {
  prevStep: () => void;
  formData: CombinedFormData;
}

const llms = [
  {
    description: "GPT",
    value: "gpt"
  },
  {
    description: "Llama",
    value: "ollama"
  },
  {
    description: "Gemini",
    value: "gemini"
  },
  {
    description: "DeepSeek",
    value: "deepseek"
  },
];

const Confirm: React.FC<ConfirmProps> = ({ prevStep, formData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [llmSelected, setSelectedLLM] = useState('');
  const navigate = useNavigate();

  const getData = () => {
    const { files, general_context, params } = formData;
    const data = {
      files,
      general_context,
      dimensions: params.dimensions,
      llm: llmSelected,
    };

    return data;
  };

  const handleSubmit = async () => {
    const data = getData();
    console.log("Dados submetidos:", data);

    const dataForm = objectToFormData(data);

    const response = await api.post("/challenge-submissions", dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data: result } = response;

    console.log("Resultado", result);

    navigate("/result", { state: result.output });
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    handleSubmit();
  };

  const handleOpenModelConfirm = (data: StepConfirmData) => {
    setSelectedLLM(data.llm);

    setIsModalOpen(true);
  }

  const form = useForm<StepConfirmData>({
    resolver: zodResolver(stepConfirmSchema),
    defaultValues: {
      llm: "gpt",
    },
    mode: 'onChange',
  });

  return (
    <div>
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(handleOpenModelConfirm)}
          noValidate
        >
          <FormField
            control={form.control}
            name="llm"
            render={({ field }) => (
              <FormItem className="mb-6" >
                <FormLabel>LLM</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione um LLM" />
                    </SelectTrigger>
                    <SelectContent>
                      {llms.map((llm) => <SelectItem value={llm.value}>{llm.description}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Selecione um LLM para a realização dos testes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="mb-4 text-xl" >Confirme seus dados</h2>

          <ConfirmPreview data={formData} />

          <div className="flex justify-between mt-10">
            <Button type="button" variant={"secondary"} onClick={prevStep}>
              Voltar
            </Button>
            <Button type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Form>

      <ConfirmModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirm}
        message="Deseja realizar a avaliação com os dados informados?"
      />
    </div>
  );
};

export default Confirm;
