import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CareerPageComponent } from './components/career/career-page/career-page.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterUsersPipe } from './pipe/filter-users.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CareerPageComponent,
    LoginComponent,
    UsersListComponent,
    FilterUsersPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
