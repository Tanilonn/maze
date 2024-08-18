import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './first-ring/landing/landing.component';

const routes: Routes = [
  {
    path : '',
    component: LandingComponent
  },
  {
    path: 'first-ring',
    loadChildren: () =>
      import('./first-ring/first-ring.module').then(
        (m) => m.FirstRingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
