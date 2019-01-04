import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { QuestionBuilderComponent } from './question-builder/question-builder.component';
import { RequiredValidatorDirective } from '../directives/required-validator.directive';
import { DependencyBuilderComponent } from './dependency-builder/dependency-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard } from './services/can-component-deactivate.service';

@NgModule({
  declarations: [
    FormBuilderComponent,
    QuestionBuilderComponent,
    RequiredValidatorDirective,
    DependencyBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [CanDeactivateGuard],
})
export class SurveyModule {

}
