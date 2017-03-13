// app/app.component.ts

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MessageService } from './app.service';
import { Message } from './message';
import { FormFilterPipe } from './pipe';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
	providers: [MessageService, FormFilterPipe]
})

export class AppComponent implements OnInit {

	constructor(private MessageService: MessageService) { }

	MessagesList: Message[]
    filterDate: number
    filterNumber: string
    filterDuration: number

	getMessages(): void {
        this.MessageService.getMessages().then(messages => this.MessagesList = messages);
	}
	ngOnInit(): void {
		this.getMessages();
	}

    resetForm(): void {
        this.filterDate = 0
        this.filterNumber = ''
        this.filterDuration = 0
    }
}
