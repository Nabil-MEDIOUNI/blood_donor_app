import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.page.html',
	styleUrls: ['./intro.page.scss']
})
export class IntroPage {
	constructor(public menuCtrl: MenuController, private router: Router) {
		this.menuCtrl.enable(false);
		this.hello();
	}
	hello() {
		setTimeout(() => {
			this.router.navigate(['home']);
		}, 8000);
	}
}
