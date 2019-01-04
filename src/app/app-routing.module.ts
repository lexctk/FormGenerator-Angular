import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './core/home/home.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { FormBuilderComponent } from './survey/form-builder/form-builder.component';
import { CanDeactivateGuard } from './survey/services/can-component-deactivate.service';
import { ErrorPageComponent } from './core/error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'survey', canActivate: [AuthGuardService], component: FormBuilderComponent, canDeactivate: [CanDeactivateGuard]},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
