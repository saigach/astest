import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Message } from './message';
import { MESSAGES } from './mock-message';
import { FormFilterPipe } from './pipe';

//var parser = require('xml2json'),
//private url:string = 'data/data.xml';

//constructor(private http: Http) { };

@Injectable()

export class MessageService {
	getMessages(): Promise<Message[]> {
	  return Promise.resolve(MESSAGES);
	}
}
