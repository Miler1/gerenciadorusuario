import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo';
import { toast } from ''

@Injectable()
export class CargoService {

  private _baseUrl = 'http://localhost:8080';
  constructor(private _http: Http) { }

  // findAll(offset: number = 0, limit: number = 20): Observable<CargoList> {
  //   return this._http
  //     .get(`${this._baseUrl}/cargos/paginate/?offset=${offset}&limit=${limit}`)
  //     .map(response => response.json())
  //     .map(results => this.getList(results));
  // }

  httpMethod() {
    return this._http.get(`${this._baseUrl}/cargos`)
    .map(response => response.json())
    // .map(results => this.getList(results));
        // set items to json response
  }

  salvar(cargo) {
    return this._http.post(`${this._baseUrl}/cargos`, cargo)
    .map(response => response.json())
  }

  deletar(id) {
    return this._http.delete(`${this._baseUrl}/cargos/${id}`)
    .map(response => response.json())
  }

  update(id: number, cargo: Cargo): Observable<any> {
    return this._http.put(`${this._baseUrl}/cargos/${id}`, cargo)
    .map(response => response.json())
  }


  // getList(data): CargoList {
  //   return new CargoList(data, data.length);
  // }

}
