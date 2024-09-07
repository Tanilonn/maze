import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubeComponent } from './youtube/youtube.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './shared/services/youtube.service';

@NgModule({
  declarations: [
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    YoutubeRoutingModule
  ],
  providers: [YoutubeService]
})
export class YoutubeModule { }
