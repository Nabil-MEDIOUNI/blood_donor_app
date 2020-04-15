import {Component, OnInit} from '@angular/core';
import {PostProvider} from 'providers/post-provider';
import {Router} from '@angular/router';
import {ToastController, LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
	selector: 'app-connect-with-email',
	templateUrl: './connect-with-email.page.html',
	styleUrls: ['./connect-with-email.page.scss']
})
export class ConnectWithEmailPage {
	user = {
		email: ''
	};
	constructor(
		private postPvdr: PostProvider,
		private router: Router,
		private storage: Storage,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {}

	async login() {
		if (!this.user.email) {
			const toast = await this.toastCtrl.create({
				message: 'Veuillez insérer correctement',
				duration: 1000
			});
			toast.present();
		} else {
			let body = {
				email: this.user.email,
				aksi: 'loginWithEmail'
			};

			this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
				var alertpesan = data.msg;
				if (data.success) {
					this.storage.set('session_storage', data.datas);
					let loading = await this.loadingCtrl.create({
						message: "Attendez s'il vous plait..."
					});
					loading.present();
					setTimeout(() => {
						loading.dismiss();
						window.location.assign('/menu');
					}, 2000);
				} else {
					const toast = await this.toastCtrl.create({
						message: alertpesan,
						duration: 1000
					});
					toast.present();
				}
			});
		}
	}
}
