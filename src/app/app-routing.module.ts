import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { FormBuilderComponent } from './form-builder/form-builder.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', canActivate: [AuthGuardService], component: FormBuilderComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
