import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    data:{
      title:LoginComponent,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path:'userDetails',
    canActivate: [AuthGuardService],
    component:UserDetailsComponent,
    data:{
      title:'User Details',
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
