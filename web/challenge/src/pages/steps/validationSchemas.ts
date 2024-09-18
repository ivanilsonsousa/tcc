import { z } from 'zod';

export const stepOneSchema = z.object({
  general_context: z
    .string()
    .min(30, {
      message: "A definição do desafio deve possuir no mínimo 30 caracteres.",
    }),
});

const maxSize = 5242880; // 5MB em bytes

export const stepTwoSchema = z.object({
  files: z
    .array(z.instanceof(File), {
      required_error: 'Você deve selecionar pelo menos um arquivo',
    })
    .min(1, 'Você deve selecionar pelo menos um arquivo')
    .max(5, 'Você pode selecionar no máximo 5 arquivos')
    .refine(
      (files) => files.every((file) => file.size <= maxSize),
      'Cada arquivo deve ter no máximo 5MB'
    )
    .refine(
      (files) => files.every((file) => file.name.endsWith('.py')),
      'Apenas arquivos .py são permitidos'
    ),
});

export const stepThreeSchema = z.object({
  nestedCheckboxes: z.record(z.boolean()).refine(
    (data) => Object.values(data).some((value) => value === true),
    { message: 'Pelo menos uma opção deve ser selecionada', path: ['nestedCheckboxes'] }
  ).optional(),
  personalizado: z.object({
    valido: z.boolean().refine((valido) => valido === true, {
      message: 'O componente personalizado é inválido',
    }),
  }),
});

export const fullFormSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;

export type CombinedFormData = StepOneData & StepTwoData & StepThreeData;
