import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';
import { FormCargoComponent } from './../app/form-cargo/form-cargo.component';
import { FormUsuarioComponent } from './../app/form-usuario/form-usuario.component';
import { FormPerfilComponent } from './../app/form-perfil/form-perfil.component';
import { TableCargoComponent } from '../app/form-cargo/table-cargo/table-cargo.component';
import { TableUsuarioComponent } from '../app/form-usuario/table-usuario/table-usuario.component';
import { TablePerfilComponent } from '../app/form-perfil/table-perfil/table-perfil.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'cargo',   component: FormCargoComponent },
  { path: 'usuario', component: FormUsuarioComponent },
  { path: 'perfil', component: FormPerfilComponent },
  // { path: 'list-cargo/:nr', component: TableCargoComponent },
  { path: 'list-cargo', component: TableCargoComponent },
  { path: 'list-usuario', component: TableUsuarioComponent },
  { path: 'list-perfil', component: TablePerfilComponent }
];
