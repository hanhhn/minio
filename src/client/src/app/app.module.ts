import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AdminLayoutModule } from './admin/layout/admin-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { HomeLayoutModule } from './home/layout/home-layout.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HomeLayoutModule,
    AdminLayoutModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
