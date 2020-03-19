import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CargoService } from '../services/cargo.service';
import { PerfilService } from '../services/perfil.service';
import { UsuarioService } from '../services/usuario.service';
import { PagerService } from './shared/_services/index';

@Injectable()
export class DataResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Observable.of({ res: 'I am data'});
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  DataResolver,
  CargoService,
  PerfilService,
  UsuarioService,
  PagerService
];
