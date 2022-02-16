import axios, { AxiosInstance } from "axios";
import { getRepository } from "typeorm";
import User from "../entities/User";
import Error400 from "../errors/Error400";
import Error401 from "../errors/Error401";
import Error404 from "../errors/Error404";
import jwt from "jsonwebtoken";

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
  erro?: boolean;
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
  const address = await userCep
    .cep(body.cep)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
  if (address!.erro) {
    throw new Error400("Invalid CEP");
  }
  try {
    const user = body;
    user.logradouro = address!.logradouro;
    user.cidade = address!.localidade;
    user.estado = address!.uf;
    const userRepository = getRepository(User);
    userRepository.create(user);

    await userRepository.save(user);

    return user;
  } catch (e: any) {
    throw new Error400(e.detail);
  }
};

export const updateUser = async (userId: string, data: any) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw new Error404();
  }
  if (data.cpf) {
    if (data.cpf.length !== 11) {
      throw new Error400("cpf must be exactly 11 characters");
    }
  }
  if (data.cep) {
    if (data.cep.length !== 8) {
      throw new Error400("cep must be exactly 8 characters");
    }
    const userCep = new ViaCep();
    const address = await userCep
      .cep(data.cep)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
    if (address!.erro) {
      throw new Error400("Invalid CEP");
    }
    data.logradouro = address!.logradouro;
    data.cidade = address!.localidade;
    data.estado = address!.uf;
  }

  try {
    await userRepository.update({ id: userId }, { ...data });
    const user = await userRepository.findOne(userId);
    return user;
  } catch (e: any) {
    throw new Error400(e.detail);
  }
};

export const deleteUser = async (userId: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  if (!user) {
    throw new Error404();
  } else {
    return userRepository.remove([user]);
  }
};

export const loginUser = async (cpf: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      cpf,
    },
  });
  if (!user) {
    throw new Error404();
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
    expiresIn: "1d",
  });
  return { token: token };
};

export const findByCPF = async (cpf: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      cpf,
    },
  });

  if (!user) {
    throw new Error404();
  }
  return user;
};

export const findByCEP = async (cep: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.find({
    where: {
      cep,
    },
  });
  if (!user) {
    throw new Error404();
  }
  return user;
};
