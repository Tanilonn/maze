import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    loadChildren: () =>
      import('./home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'first-ring',
    loadChildren: () =>
      import('./first-ring/first-ring.module').then(
        (m) => m.FirstRingModule
      ),
  },
  {
    path : 'portfolio',
    loadChildren: () =>
      import('./portfolio-overview/portfolio-overview.module').then(
        (m) => m.PortfolioOverviewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
