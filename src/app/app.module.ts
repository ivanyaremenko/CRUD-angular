import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerConfiguration } from './owner-configuration/owner-configuration.component';
import { OwnersCars } from './owners-cars/owners-cars.component';
import { DataService } from './services/owners.service';

@NgModule({
  declarations: [
    AppComponent,
    OwnersCars,
    OwnerConfiguration
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, {delay: 0})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
