import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorGuard } from './auth/administrator.guard';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  {path:"career/page/:id", component:CareerPageComponent},
  {path:"users/list", component:UsersListComponent, canActivate:[AdministratorGuard]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
