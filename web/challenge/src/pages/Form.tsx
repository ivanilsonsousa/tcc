import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "@/api";
import NestedCheckboxList from "./NestedCheckboxList";
import { formatOutput, objectToFormData } from "@/utils";
import { useNavigate } from 'react-router-dom';

export function FormPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Estado para armazenar dados
  const [dimensionsList, setDimensionsList] = useState<any>({});

  const formSchema = z.object({
    general_context: z
      .string()
      .min(30, {
        message: "A definição do desafio deve possuir no minímo 30 caracteres.",
      }),
    files: z
      .instanceof(FileList, {
        message: "O arquivo é obrigatório",
      })
      .refine((files) => files?.length > 0, "Arquivo é obrigatório")
      .or(z.null()),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      general_context: `Contexto: O pensamento computacional é uma habilidade essencial que permite resolver problemas de forma sistemática e eficiente, aplicando conceitos fundamentais da ciência da computação. Um dos desafios comuns para praticar essa habilidade é o cálculo de médias, uma operação simples, mas fundamental, que exige atenção aos detalhes e uma boa compreensão de como os dados devem ser manipulados e interpretados. Descrição do Desafio: Você é responsável por desenvolver um programa que calcule a média das notas de uma turma de alunos. Este programa deve receber como entrada as notas individuais de cada aluno e, em seguida, calcular e exibir a média da turma. Além disso, o programa deve indicar quantos alunos estão acima, abaixo e na média da turma.`,
      files: undefined,
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      ...dimensionsList
    }

    console.log("onSubmit::", data);

    const formData = objectToFormData(data);

    const response = await api.post('/challenge-submissions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data: result } = response;

    const output = formatOutput(result.output);

    navigate("/result", { state: output });
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-slate-500">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Analisador de Desafios</CardTitle>
          <CardDescription>
            Preencha o formulário para a análise dos desafios
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <FormField
                control={form.control}
                name="general_context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contexto Geral</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva" rows={5} {...field} />
                    </FormControl>
                    <FormDescription>
                      Descreva de forma geral sobre o desafio proposto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Envio do Código</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".py"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormDescription>Envie um arquivo .py</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2">
                <NestedCheckboxList
                  data={data}
                  onValueChange={handleValueCheckboxListChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
