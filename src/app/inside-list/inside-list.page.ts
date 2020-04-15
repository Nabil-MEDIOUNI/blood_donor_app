import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {MenuController} from '@ionic/angular';
import {PostProvider} from 'providers/post-provider';
import {Router} from '@angular/router';

@Component({
	selector: 'app-inside-list',
	templateUrl: './inside-list.page.html',
	styleUrls: ['./inside-list.page.scss']
})
export class InsideListPage {
	userData = {
		name: '',
		bloodType: '',
		village: '',
		user_id: '',
		feed_id: '',
		phone: '',
		description: '',
		photo: '',
		myDate: ''
	};
	bring: any;
	constructor(
		private router: Router,
		private postPvdr: PostProvider,
		public menuCtrl: MenuController,
		private storage: Storage
	) {
		this.storage.get('session_storage').then((res) => {
			this.bring = res;
			this.userData.user_id = this.bring.user_id;
		});
		this.menuCtrl.enable(false);
	}

	ionViewWillEnter() {
		let body = {
			user_id: this.userData.user_id,
			feed_id: this.userData.feed_id,
			phone: this.userData.phone,
			name: this.userData.name,
			bloodType: this.userData.bloodType,
			village: this.userData.village,
			description: this.userData.description,
			date: this.userData.myDate,
			photo: this.userData.photo,
			aksi: 'feed-details'
		};
		this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
			let users = data.datass;
			this.storage.get('session_storage_list').then((data) => {
				this.userData = users.date;
				this.userData = users;
			});
		});
	}
	go_back() {
		this.router.navigate(['list']);
	}
}
