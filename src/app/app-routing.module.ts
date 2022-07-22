import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorGuard } from './auth/administrator.guard';
import { CareerListComponent } from './components/career/career-list/career-list.component';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';


const routes: Routes = [
  {path:"career/page/:id", component:CareerPageComponent},
  {path:"career/list", component:CareerListComponent},
  {path:"users/list", component:UsersListComponent},
  {path:'login', component:LoginComponent, },
  {path:'register', component:RegisterComponent},
  {path:"", redirectTo: "/login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
