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
import { BoardPageComponent } from './components/board-page/board-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CareerPageComponent,
    LoginComponent,
    BoardPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
