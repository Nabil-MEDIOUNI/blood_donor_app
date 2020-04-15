import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
	MenuController,
	NavController,
	ToastController,
	AlertController,
	LoadingController
} from '@ionic/angular';

import {PostProvider} from 'providers/post-provider';
import {Storage} from '@ionic/storage';

@Component({
	selector: 'app-list',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss']
})
export class ListPage {
	created: boolean = true;
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
	user = {
		user_id: ''
	};
	bring: any;
	show = false;
	public dataSet: any;
	constructor(
		private router: Router,
		public loadingCtrl: LoadingController,
		public menuCtrl: MenuController,
		public navCtrl: NavController,
		private storage: Storage,
		private postPvdr: PostProvider,
		public toastCtrl: ToastController,
		private alertCtrl: AlertController
	) {
		this.storage.get('session_storage').then((res) => {
			this.bring = res;
			this.userData.user_id = this.bring.user_id;
			this.userData.photo = this.bring.myphoto;
			console.log(this.bring.myphoto);
		});
	}

	getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) *
				Math.cos(this.deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	deg2rad(deg) {
		return deg * (Math.PI / 180);
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
		console.log('here user_id ' + '(' + this.userData.user_id + ')');
		this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
			let users = data.datass;
			this.storage.get('session_storage_list').then((data) => {
				this.userData = users.date;
				this.userData = users;
				if (this.userData.feed_id == null) {
					this.show = true;
					this.created = false;
				}
			});
		});
	}
	async delete() {
		let alert = await this.alertCtrl.create({
			message: 'Vous voulez vraiment supprimer cette liste?',
			buttons: [
				{
					text: 'Annuler',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Ok',
					handler: () => {
						let body = {
							feed_id: this.userData.feed_id,
							user_id: this.userData.user_id,
							aksi: 'feed-delete'
						};
						this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
							if (data.success) {
								const toast = await this.toastCtrl.create({
									message: 'Liste supprimée avec succès',
									duration: 1000
								});
								toast.present();
							}
							this.created = false;
							this.storage.remove('session_storage_list');
						});
					}
				}
			]
		});
		alert.present();
	}
	go_back() {
		this.router.navigate(['menu']);
	}

	async details() {
		let loading = await this.loadingCtrl.create({
			message: "Collecte d'informations..."
		});
		loading.present();
		setTimeout(() => {
			loading.dismiss();
			window.location.assign('/inside-list');
		}, 2000);
	}
}
