import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { QuestionBuilderComponent } from './question-builder/question-builder.component';
import { CanDeactivateGuard } from './services/can-component-deactivate.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RequiredValidatorDirective } from './directives/required-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    FormBuilderComponent,
    QuestionBuilderComponent,
    RequiredValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
