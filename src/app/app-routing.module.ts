import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './core/home/home.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { CanDeactivateGuard } from './survey/services/can-component-deactivate.service';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { FormBuilderComponent } from './survey/form-builder/form-builder.component';
import { PageBuilderComponent } from './survey/page-builder/page-builder.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'survey', canActivate: [AuthGuardService], component: PageBuilderComponent, canDeactivate: [CanDeactivateGuard]},
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
