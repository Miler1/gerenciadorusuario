import { Perfil } from './perfil';

export class PerfilList {
  perfis: Perfil[];
  count: number;

  constructor(perfis: Perfil[], count: number) {
    this.perfis = perfis;
    this.count = count;
  }
}
