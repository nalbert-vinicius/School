import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './components/alunos/alunos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProfessoresComponent } from './components/professores/professores.component';

const routes: Routes = [    
    { path: 'alunos', component: AlunosComponent },
    { path: 'alunos/:id', component: AlunosComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'professores', component: ProfessoresComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

export const RoutingRoutes = RouterModule.forRoot(routes);
