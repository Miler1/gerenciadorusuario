import { Cargo } from "./cargo";
import { Perfil } from './perfil';

export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    sexo:string;
    cargo: Cargo;
    perfil: Perfil;
    dataCadastro: Date;

    constructor(id: number = null, nome: string = "", cpf: string = "", dataNascimento: Date = null, sexo: string = "", cargo: Cargo = null, perfil: Perfil = null, dataCadastro: Date = null) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.dataNascimento = dataNascimento;
      this.sexo = sexo;
      this.cargo = cargo;
      this.perfil = perfil;
      this.dataCadastro = dataCadastro;
    }
}
