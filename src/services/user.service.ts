import axios, { AxiosInstance } from "axios";
import { getRepository } from "typeorm";
import User from "../entities/User";

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
export default class ViaCep {
  baseURL: string = "https://viacep.com.br/";
  axiosIntance: AxiosInstance;

  constructor() {
    this.axiosIntance = axios.create({
      baseURL: this.baseURL,
    });
  }
  async cep(cep: string) {
    const requestURL = `ws/${cep}/json/`;
    const response = await this.axiosIntance.get(requestURL);
    return response.data as Address;
  }
}
interface UserBody {
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  logradouro?: string;
  cidade?: string;
  estado?: string;
}
export const listUsers = async () => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return users;
};

export const createUser = async (body: UserBody) => {
  const userCep = new ViaCep();
  try {
    const address = await userCep.cep(body.cep).then((res) => {
      return res;
    });
    const user = body;
    user.logradouro = address.logradouro;
    user.cidade = address.localidade;
    user.estado = address.uf;

    return user;
  } catch (error: any) {
    return { error: "CEP inválido" };
  }
};
