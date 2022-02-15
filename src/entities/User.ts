import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nome!: string;

  @Column()
  telefone!: string;

  @Column()
  cpf!: string;

  @Column()
  cep!: string;

  @Column()
  logradouro!: string;

  @Column()
  cidade!: string;

  @Column()
  estado!: string;
}
