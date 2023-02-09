import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstRingRoutingModule } from './first-ring-routing.module';
import { MoonComponent } from './moon/moon.component';
import { LandingComponent } from './landing/landing.component';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoonComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    FirstRingRoutingModule,
    MatInputModule,
    FormsModule
  ]
})
export class FirstRingModule { }
