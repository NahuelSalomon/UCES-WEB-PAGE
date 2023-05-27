import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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
import { ConfirmEmailComponent } from './components/confirmation-email/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './components/confirmation-email/email-confirmed/email-confirmed.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { DeleteSubjectModalComponent } from './components/subjects/subject-modals/delete-subject-modal/delete-subject-modal.component';
import { AddSubjectComponent } from './components/subjects/add-subject/add-subject.component';
import { SendEmailToResetPasswordComponent } from './components/forget-password/send-email-to-reset-password/send-email-to-reset-password.component';
import { ResetPasswordComponent } from './components/forget-password/reset-password/reset-password.component';
import { ProfessorListComponent } from './components/professor/professor-list/professor-list.component';
import { DeleteProfessorModalComponent } from './components/professor/modals-professor/delete-professor-modal/delete-professor-modal.component';
import { AddProfessorComponent } from './components/professor/add-professor/add-professor.component';
import { EditProfessorComponent } from './components/professor/edit-professor/edit-professor.component';
import { CareerPollComponent } from './components/career/career-poll/career-poll.component';
import { PollModalComponent } from './components/polls/poll-modal/poll-modal.component';
import { NgxFileDropModule  } from 'ngx-file-drop';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';



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
    ConfirmEmailComponent,
    SubjectListComponent,
    DeleteSubjectModalComponent,
    EmailConfirmedComponent,
    AddSubjectComponent,
    SendEmailToResetPasswordComponent,
    ResetPasswordComponent,
    ProfessorListComponent,
    DeleteProfessorModalComponent,
    AddProfessorComponent,
    EditProfessorComponent,
    CareerPollComponent,
    PollModalComponent,
    UserDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    NgxFileDropModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
