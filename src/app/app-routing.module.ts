import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PolicyInsuredDetailsComponent } from './Components/policy-insured-details/policy-insured-details.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Login',component:LoginComponent},
  {path:'PolicyInsuredDetails',component:PolicyInsuredDetailsComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
