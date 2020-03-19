import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { UsuarioList } from '../models/usuarioList';
import { Usuario } from '../models/usuario';
import { CargoList } from '../models/cargoList';

@Injectable()
export class UsuarioService {

  private _baseUrl = 'http://localhost:8080';
  constructor(private _http: Http) { }

  // findAll(offset: number = 0, limit: number = 20): Observable<UsuarioList> {
  //   return this._http
  //     .get(`${this._baseUrl}/usuarios/?offset=${offset}&limit=${limit}`)
  //     .map(response => response.json())
  //     .map(results => this.getList(results));
  // }

  // getCargo() {
  //   return this._http.get(`${this._baseUrl}/cargos`)
  //   .map(response => response.json())
  // }

  // getPerfil() {
  //   return this._http.get(`${this._baseUrl}/perfis`)
  //   .map(response => response.json())
  // }

  httpMethod() {
    return this._http.get(`${this._baseUrl}/usuarios`)
    .map(response => response.json())
  }

  salvar(usuario) {
    return this._http.post(`${this._baseUrl}/usuarios`, usuario)
    .map(response => response.json())
  }

  deletar(id) {
    return this._http.delete(`${this._baseUrl}/usuarios/${id}`)
    .map(response => response.json())
  }

  update(id: number, usuario: Usuario): Observable<any> {
    return this._http.put(`${this._baseUrl}/usuarios/${id}`, usuario)
    .map(response => response.json())
  }

  getList(data): UsuarioList {
    return new UsuarioList(data, 721);
  }

  // getListCargos(data): CargoList {
  //   return new CargoList(data, data.length)
  // }

}
