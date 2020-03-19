import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule} from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './../routes/app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import '../styles/styles.scss';
import '../styles/headings.css';
import { FormCargoComponent } from './form-cargo/form-cargo.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { TableCargoComponent } from './form-cargo/table-cargo/table-cargo.component';
import { TableUsuarioComponent } from './form-usuario/table-usuario/table-usuario.component';
import { TablePerfilComponent } from './form-perfil/table-perfil/table-perfil.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { LoaderComponent } from './shared/loader/loader.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    FormCargoComponent,
    FormUsuarioComponent,
    FormPerfilComponent,
    TableCargoComponent,
    TableUsuarioComponent,
    TablePerfilComponent,
    PaginationComponent,
    LoaderComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    MaterializeModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
