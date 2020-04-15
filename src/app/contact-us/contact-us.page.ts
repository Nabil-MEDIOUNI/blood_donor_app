import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

// import {HttpClientModule} from '@angular/common/http';
// import {HttpModule} from '@angular/http';
@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.page.html',
	styleUrls: ['./contact-us.page.scss']
})
export class ContactUsPage {
	object = {
		description: '',
		email: '',
		name: ''
	};
	constructor(private router: Router, private emailComposer: EmailComposer) {
		this.emailComposer.isAvailable().then((available: boolean) => {
			if (available) {
				//Now we know we can send
			}
		});
	}

	go_back() {
		this.router.navigate(['menu']);
	}
	submit() {
		if (!this.object.email || !this.object.description) {
			console.log('empty Description or email');
		} else {
			let email = {
				to: 'nabilmediouni8@gmail.com',
				from: this.object.email,
				attachments: [
					'file://img/logo.png',
					'../../assets/DonDuSang_Logo-Recovered.png',
					'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
					'file://README.pdf'
				],
				subject: this.object.name,
				body: this.object.description,
				isHtml: true
			};

			// Send a text message using default options
			this.emailComposer.open(email);
		}

		// let email = {
		// 	to: 'nabilmediouni8@gmail.com',
		// 	attachments: [],
		// 	subject: 'Commentaire',
		// 	body: this.description,
		// 	isHtml: false,
		// 	app: 'gmail'
		// };
		// this.emailComposer.open(email);
	}
}
