import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeatComponent } from './heat/heat.component';
import { MoonComponent } from './moon/moon.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path : '',
    component : LandingComponent
  },
  {
    path : 'moon',
    component : MoonComponent
  },
  {
    path : 'heat',
    component : HeatComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstRingRoutingModule { }
