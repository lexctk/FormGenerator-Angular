import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../authentication/auth-guard.service';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CanDeactivateGuard } from './services/can-component-deactivate.service';

const surveyRoutes: Routes = [
  {
    path: 'survey', canActivate: [AuthGuardService], component: PageBuilderComponent, children: [
      {path: ':id', component: FormBuilderComponent, canDeactivate: [CanDeactivateGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(surveyRoutes)
  ],
  exports: [RouterModule]
})

export class SurveyRoutingModule {

}
