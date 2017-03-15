import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FromFilterPipe, DurationFilterPipe } from './pipe';
import { DateFilterPipe, secPipe } from './date.pipe';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule],
  declarations: [AppComponent, FromFilterPipe, DateFilterPipe, secPipe, DurationFilterPipe],
  bootstrap: [AppComponent]
})

export class AppModule{};
