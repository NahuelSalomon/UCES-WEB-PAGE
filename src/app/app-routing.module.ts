import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"career/page/:id", component:CareerPageComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
