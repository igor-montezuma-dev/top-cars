import { z } from "zod";

const vehicleSchema = z.object({
  ano: z.number()
    .min(1970, "O ano deve ser após 1970.")
    .max(new Date().getFullYear(), "O ano não pode ser no futuro."),
  combustivel: z.string().min(1, "O combustível é obrigatório."),
  cor: z.string().min(1, "A cor é obrigatória."),
  id: z.number(),
  model: z.object({
    id: z.number(),
    nome: z.string().min(1, "O nome do modelo é obrigatório."),
    valor_fipe: z.number().min(0, "O valor FIPE deve ser maior ou igual a 0."),
    brand: z.object({
      marca_id: z.number(),
      nome_marca: z.string().min(1, "O nome da marca é obrigatório."),
    }),
  }),
  brand: z.object({
    marca_id: z.number(),
    nome_marca: z.string().min(1, "O nome da marca é obrigatório."),
  }),
  nome_modelo: z.string().min(1, "O nome do modelo é obrigatório."),
  num_portas: z.number()
    .min(2, "O número de portas deve ser pelo menos 2."),
  timestamp_cadastro: z.string(),
  valor: z.number().min(0, "O valor deve ser maior ou igual a 0."),
});

export default vehicleSchema;