import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonComponent } from './moon/moon.component';

const routes: Routes = [
  {
    path : 'moon',
    component : MoonComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstRingRoutingModule { }
