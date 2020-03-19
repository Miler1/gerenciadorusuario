import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { PerfilList } from '../models/perfilList';
import { Perfil } from '../models/perfil';

@Injectable()
export class PerfilService {

  private _baseUrl = 'http://localhost:8080';
  constructor(private _http: Http) { }

  // findAll(offset: number = 0, limit: number = 20): Observable<PerfilList> {
  //   return this._http
  //     .get(`${this._baseUrl}/perfis/?offset=${offset}&limit=${limit}`)
  //     .map(response => response.json())
  //     .map(results => this.getList(results));
  // }

  httpMethod() {
    return this._http.get(`${this._baseUrl}/perfis`)
    .map(response => response.json())
  }

  salvar(perfil) {
    return this._http.post(`${this._baseUrl}/perfis`, perfil)
    .map(response => response.json())
  }

  deletar(id) {
    return this._http.delete(`${this._baseUrl}/perfis/${id}`)
    .map(response => response.json())
  }

  update(id: number, perfil: Perfil): Observable<any> {
    return this._http.put(`${this._baseUrl}/perfis/${id}`, perfil)
    .map(response => response.json())
  }

  // getList(data): PerfilList {
  //   return new PerfilList(data, 721);
  // }

}
