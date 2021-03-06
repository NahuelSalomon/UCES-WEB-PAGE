import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { LoginComponent } from './components/login/login.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterUsersPipe } from './pipe/filter-users.pipe';
import { InterceptorService } from './auth/interceptor.service';
import { CareerListComponent } from './components/career/career-list/career-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './components/register/register.component';
import { DeleteCareerModalComponent } from './components/career/career-modals/delete-career-modal/delete-career-modal.component';
import { AddCareerComponent } from './components/career/add-career/add-career.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';



@NgModule({
  declarations: [
    AppComponent,
    CareerPageComponent,
    LoginComponent,
    BoardPageComponent,
    UsersListComponent,
    FilterUsersPipe,
    CareerListComponent,
    NavBarComponent,
    RegisterComponent,
    DeleteCareerModalComponent,
    AddCareerComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
