import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';

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
    component:UserDetailsComponent,
    data:{
      title:'User Details',
    },
  },
  {
    path:'register',
    component:RegisterComponent,
    data:{
      title:'Register User',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
