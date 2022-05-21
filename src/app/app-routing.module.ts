import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { EncabezadoFormComponent } from './formulario/encabezado-form/encabezado-form.component';
import { GuardGuard } from './guard/guard.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  //{path:'porfolio',component:PorfolioComponent},
  {path:'porfolio',component:PorfolioComponent,canActivate:[GuardGuard]},
  // {path:'educacion',component:EducacionComponent, canActivate:[GuardGuard]},
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'',redirectTo:'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling:'enabled',
    scrollPositionRestoration:'enabled',
    onSameUrlNavigation:"ignore"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
