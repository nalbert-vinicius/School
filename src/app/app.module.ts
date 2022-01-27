import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { TituloComponent } from './components/shared/titulo/titulo.component';
import { RoutingRoutes } from './routing.routing';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    NavComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent
  ],
  imports: [
    BrowserModule,
    RoutingRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
