import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorGuard } from './auth/administrator.guard';
import { CareerListComponent } from './components/career/career-list/career-list.component';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { ConfirmEmailComponent } from './components/confirmation-email/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './components/confirmation-email/email-confirmed/email-confirmed.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';


const routes: Routes = [
  {path:"subject/list", component:SubjectListComponent},
  {path:"career/page/:id", component:CareerPageComponent},
  {path:"career/list", component:CareerListComponent},
  {path:"users/list", component:UsersListComponent},
  {path:'login', component:LoginComponent },
  {path:'confirm-email', component:ConfirmEmailComponent },
  {path:'email-confirmed', component:EmailConfirmedComponent },
  {path:'register', component:RegisterComponent},
  {path:"", redirectTo: "/login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
