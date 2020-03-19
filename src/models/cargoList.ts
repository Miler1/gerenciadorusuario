import { Cargo } from './cargo';

export class CargoList {
  cargos: Cargo[];
  count: number;

  constructor(cargos: Cargo[], count: number) {
    this.cargos = cargos;
    this.count = count;
  }
}
