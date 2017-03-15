// app/app.component.ts

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MessageService } from './app.service';
import { Message } from './message';
import { FromFilterPipe, DurationFilterPipe } from './pipe';
import { DateFilterPipe, secPipe } from './date.pipe';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
	providers: [MessageService, FromFilterPipe, DateFilterPipe, secPipe, DurationFilterPipe]
})

export class AppComponent implements OnInit {

	constructor(private MessageService: MessageService) { }

	MessagesList: Message[]
    filterDate: string = ''
    filterNumber: string
    filterDuration: number

	getMessages(): void {
        //this.MessageService.getMessages();
        this.MessageService.getMessages().subscribe(data => {
          this.MessagesList = data
        });
    }
	ngOnInit(): void {
		this.getMessages();
	}

    resetForm(): void {
        this.filterDate = ''
        this.filterNumber = ''
        this.filterDuration = null
    }

    downloadFile($event: any, id:number): void {
        let msg = this.MessagesList[id]
        var data = msg.Filename,
        blob = new Blob([data], { type: 'audio/' + msg.MIME }),
        url = window.URL.createObjectURL(blob)
        window.URL.revokeObjectURL(url)
    }

    onChange(val: any): void {
        this.filterDate = val;
    }
}
