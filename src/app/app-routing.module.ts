import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { ThankYouPageComponent } from './core/thank-you-page/thank-you-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: '404', component: ErrorPageComponent},
  {path: 'thank-you', component: ThankYouPageComponent},
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
