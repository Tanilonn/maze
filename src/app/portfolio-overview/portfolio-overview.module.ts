import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioOverviewRoutingModule } from './portfolio-overview-routing.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    PortfolioOverviewRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class PortfolioOverviewModule { }
