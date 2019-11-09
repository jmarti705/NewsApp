import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { NewsApiService } from '../app/services/news-api.service'
import { NewsListComponent } from './components/news-list/news-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CommonModule 
  ],
  exports: [
    RouterModule
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
