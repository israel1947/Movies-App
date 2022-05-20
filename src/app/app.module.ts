import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//plugins
import { IonicStorageModule } from '@ionic/storage-angular';
import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],

  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    YoutubeVideoPlayer,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
     }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
