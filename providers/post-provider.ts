import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
@Injectable()
export class PostProvider {
	// apiUrl = 'http://DESKTOP-C792Q58/Project/server_api/';
	// apiUrl = 'http://localhost/Project/server_api/';
	apiUrl = 'http://192.168.137.1/Project/server_api/';

	constructor(public http: Http) {}
	postData(body, file) {
		let type = 'application/json; charset=UTF-8';
		let headers = new Headers({'Content-Type': type});
		let options = new RequestOptions({headers: headers});

		return this.http
			.post(this.apiUrl + file, JSON.stringify(body), options)
			.pipe(map((res) => res.json()));
	}
}
