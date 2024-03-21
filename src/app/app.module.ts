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
import { AddCareerComponent } from './components/career/add-career/add-career.component';
import { ConfirmEmailComponent } from './components/confirmation-email/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './components/confirmation-email/email-confirmed/email-confirmed.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { AddSubjectComponent } from './components/subjects/add-subject/add-subject.component';
import { SendEmailToResetPasswordComponent } from './components/forget-password/send-email-to-reset-password/send-email-to-reset-password.component';
import { ResetPasswordComponent } from './components/forget-password/reset-password/reset-password.component';
import { CareerPollComponent } from './components/career/career-poll/career-poll.component';
import { PollModalComponent } from './components/polls/poll-modal/poll-modal.component';
import { NgxFileDropModule  } from 'ngx-file-drop';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { PollQuestionStatisticsComponent } from './components/polls/poll-question-statistics/poll-question-statistics.component';
import { StarsComponent } from './components/stars/stars.component';
import { PercentageBarComponent } from './components/percentage-bar/percentage-bar.component';
import { PollListComponent } from './components/polls/poll-list/poll-list.component';
import { PollDetailsComponent } from './components/polls/poll-details/poll-details.component';
import { PollQuestionAddComponent } from './components/polls/poll-question-add/poll-question-add.component';
import { PollQuestionListComponent } from './components/polls/poll-question-list/poll-question-list.component';



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
    AddCareerComponent,
    ConfirmEmailComponent,
    SubjectListComponent,
    EmailConfirmedComponent,
    AddSubjectComponent,
    SendEmailToResetPasswordComponent,
    ResetPasswordComponent,
    CareerPollComponent,
    PollModalComponent,
    UserDetailsComponent,
    PollQuestionStatisticsComponent,
    StarsComponent,
    PercentageBarComponent,
    PollListComponent,
    PollDetailsComponent,
    PollQuestionAddComponent,
    PollQuestionListComponent
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
