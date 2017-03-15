import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Message } from './message';


@Injectable()

export class MessageService {
	constructor(private http: Http) { };

	private url:string = 'data/data.xml';

	getMessages(): Observable<any> {
		/*return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);*/
		let headers = new Headers(
        {
            'Content-Type': 'text/xml'
        });
		let options = new RequestOptions({ headers: headers });
		return this.http.get('data/data.xml', options).map(this.extractData).catch(this.handleError);
	}

  private extractData(res: Response) {
	let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(res.text(), "text/xml")
	let MESSAGES:Message[] = []
	if (xmlDoc.hasChildNodes()) {
	let chldrn = xmlDoc.getElementsByTagName("Data")
		//console.log(chldrn[5])
		for(let i=0; i<chldrn.length; i++) {
			let message = new Message()
		    message.Received = chldrn[i].children[0].textContent;
			message.From = chldrn[i].children[1].textContent;
			message.Duration = parseInt(chldrn[i].children[5].textContent);
			message.MIME = chldrn[i].children[4].children[0].getAttribute('subtype');
			message.Filename = chldrn[i].children[4].children[0].getAttribute('Disposition-filename');
			MESSAGES.push(message)
		}
	}
    return MESSAGES || [];
  }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

export class xmlParseService {

}
