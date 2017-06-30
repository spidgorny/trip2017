import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
import { GmapComponent } from './gmap/gmap.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceListItemComponent,
    GmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
