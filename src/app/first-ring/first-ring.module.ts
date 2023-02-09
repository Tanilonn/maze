import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstRingRoutingModule } from './first-ring-routing.module';
import { MoonComponent } from './moon/moon.component';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    MoonComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    FirstRingRoutingModule
  ]
})
export class FirstRingModule { }
