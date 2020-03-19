export class Cargo {
  id: number;
  nome: string;

  constructor(id: number = null, nome: string = "") {
    this.id = id;
    this.nome = nome;
  }
}
