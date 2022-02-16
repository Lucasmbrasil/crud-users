import * as yup from "yup";

export const UserSchema = yup.object().shape({
  nome: yup.string().required(),
  telefone: yup.string().min(11).max(12).required(),
  cpf: yup.string().length(11).required(),
  cep: yup.string().length(8).required(),
});
