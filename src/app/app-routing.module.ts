import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerPageComponent } from './components/career/career-page/career-page.component';

const routes: Routes = [
  {path:"career/page/:id", component:CareerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
