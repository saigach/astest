// app/app.component.ts

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MessageService } from './app.service';
import { Message } from './message';
import { FromFilterPipe, DurationFilterPipe } from './pipe';
import { DateFilterPipe, secPipe } from './date.pipe';
import { PagerService } from './pager.service';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  providers: [MessageService, FromFilterPipe, DateFilterPipe, secPipe, DurationFilterPipe, PagerService]
})

export class AppComponent implements OnInit {

  constructor(private MessageService: MessageService, private durationFilter: DurationFilterPipe, private PagerService: PagerService) { };

  MessagesList: Message[];
  filterDate: string = '';
  filterNumber: string;
  filterDuration: number = 0;

  pager = {
    numOfItems: this.PagerService.getNumOfItems(),
    curPage: this.PagerService.getCurPage(),
    totalPages: 0,
    numbers: Array()
  };

  getMessages(): void {
    //this.MessageService.getMessages();
    this.MessageService.getMessages().subscribe(data => {
      this.MessagesList = data;
      this.PagerService.initPager(this.MessagesList)
    });
  }
  ngOnInit(): void {
    this.getMessages();
  }

  resetForm(): void {
    this.filterDate = '';
    this.filterNumber = '';
    this.filterDuration = 0;
    this.PagerService.initPager(this.MessagesList)
  }

  /*downloadFile($event:Event, id: number): void {
      $event.preventDefault()
      this.MessageService.downloadFile(this.MessagesList[id])
  }*/
}
