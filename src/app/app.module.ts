import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//amplify, do not remove
import {AmplifyUIAngularModule} from "@aws-amplify/ui-angular";
import { HttpClientModule } from '@angular/common/http';
import { ParkingViewPageModule } from './parking-view/parking-view.module';


@NgModule({
  declarations: [ AppComponent, ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AmplifyUIAngularModule, HttpClientModule, ParkingViewPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
