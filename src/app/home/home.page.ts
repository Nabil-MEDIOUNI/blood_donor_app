import {Component, ViewChild} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {
	LoadingController,
	IonRouterOutlet,
	Platform,
	AlertController,
	ToastController,
	MenuController,
	NavController
} from '@ionic/angular';
import {Router} from '@angular/router';
import {PostProvider} from 'providers/post-provider';
import {Storage} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Network} from '@ionic-native/network/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	user = {
		phone: '',
		email: '',
		username: '',
		password: '',
		passwordConfirmation: '',
		bloodType: '',
		sex: '',
		village: '',
		date: '',
		myphoto: '../../assets/user.png'
	};
	userData: any;
	bring: any;
	nativeStorage: any;
	loadingController: any;

	constructor(
		private facebook: Facebook,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private router: Router,
		private platform: Platform,
		public toastCtrl: ToastController,
		private storage: Storage,
		private postPvdr: PostProvider,
		private googlePlus: GooglePlus,
		public menuCtrl: MenuController,
		private network: Network,
		private statusBar: StatusBar
	) {}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}
	async loginWithFb() {
		this.facebook
			.login(['email', 'public_profile'])
			.then((response: FacebookLoginResponse) => {
				this.facebook
					.api(
						'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',
						[]
					)
					.then(async (profile) => {
						this.user = {
							phone: '',
							email: profile.email,
							username: profile.name,
							password: '',
							passwordConfirmation: '',
							bloodType: '',
							sex: '',
							village: '',
							date: '',
							myphoto: profile.picture_large.data.url
						};
						console.log(this.user);
						console.log(profile);
						console.log(response);
						this.storage.set('session_storage', this.user);
						let loading = await this.loadingCtrl.create({
							message: "Attendez s'il vous plait..."
						});
						loading.present();
						setTimeout(() => {
							loading.dismiss();
							this.router.navigate(['menu']);
						}, 2000);
					});
			});
	}

	loginWithGp() {
		this.googlePlus
			.login({})
			.then((data) => {
				console.log(data);
			})
			.catch((data) => {
				console.log(data);
			});
	}

	Create() {
		this.router.navigate(['create-account']);
	}
	connectWithEmail() {
		this.router.navigate(['connect-with-email']);
	}
	async login() {
		if (!this.user.email || !this.user.password) {
			const toast = await this.toastCtrl.create({
				message: 'Veuillez insérer correctement',
				duration: 1000
			});
			toast.present();
		} else {
			let body = {
				email: this.user.email,
				password: this.user.password,
				aksi: 'login'
			};

			this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
				var alertpesan = data.msg;
				if (data.success) {
					this.storage.set('session_storage', data.datas);
					console.log(data);
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
