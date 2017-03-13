import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormFilterPipe } from './pipe';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule],
  declarations: [AppComponent, FormFilterPipe],
  bootstrap: [AppComponent]
})

export class AppModule{};
