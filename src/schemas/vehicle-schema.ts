import { z } from "zod";

const vehicleSchema = z.object({
  brand: z.string().min(1, "A marca é obrigatória."),
  valor: z.number().min(1, "O valor deve ser maior que 0."),
  combustivel: z.string().min(1, "O combustível é obrigatório."),
  cor: z.string().min(1, "A cor é obrigatória."),
  num_portas: z
    .number()
    .min(2, "O número de portas deve ser pelo menos 2.")
    .max(4, "O número de portas deve ser no máximo 4."),
  ano: z
    .number()
    .min(1970, "O ano deve ser após 1970.")
    .max(new Date().getFullYear(), "O ano não pode ser no futuro."),
  nome_modelo: z.string().min(1, "O modelo é obrigatório."),
});

export default vehicleSchema;
