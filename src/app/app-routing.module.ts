import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsComponent } from './units/components/units/units.component';
import { LoginComponent } from './login/components/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'units',
        component: UnitsComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
