import { Usuario } from './usuario';

export class UsuarioList {
  usuarios: Usuario[];
  count: number;

  constructor(cargos: Usuario[], count: number) {
    this.usuarios = cargos;
    this.count = count;
  }
}
