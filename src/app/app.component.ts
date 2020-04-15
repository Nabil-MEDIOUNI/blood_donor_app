import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, LoadingController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	user = {
		email: '',
		password: '',
		username: '',
		bloodType: '',
		passwordConfirmation: '',
		sex: '',
		village: '',
		date: '',
		user_id: '',
		myphoto: ''
	};
	userData = {
		phone: '',
		name: '',
		bloodType: '',
		village: '',
		description: '',
		myDate: '',
		user_id: '',
		feed_id: '',
		photo: ''
	};
	bring: any;
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private storage: Storage,
		public loadingCtrl: LoadingController,
		private router: Router
	) {
		this.initializeApp();
	}

	backToWelcome() {
		this.router.navigate(['home']);
	}
	log_out() {
		this.storage.remove('session_storage');
		this.storage.remove('session_storage_list');
		setTimeout(() => this.backToWelcome(), 1000);
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
		this.storage.get('session_storage').then((res) => {
			this.bring = res;
			this.user.email = this.bring.email;
			this.user.password = this.bring.password;
			this.user.username = this.bring.username;
			this.user.passwordConfirmation = this.bring.passwordConfirmation;
			this.user.bloodType = this.bring.bloodType;
			this.user.sex = this.bring.sex;
			this.user.date = this.bring.date;
			this.user.village = this.bring.village;
			this.user.user_id = this.bring.user_id;
			this.user.myphoto = this.bring.myphoto;
		});
	}

	async list() {
		let loading = await this.loadingCtrl.create({
			message: "Attendez s'il vous plait..."
		});
		loading.present();
		setTimeout(() => {
			loading.dismiss();
			window.location.assign('/list');
		}, 2000);
	}
}
