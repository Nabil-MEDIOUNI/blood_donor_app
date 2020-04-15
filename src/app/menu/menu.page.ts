import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, ToastController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {NavController, AlertController} from '@ionic/angular';
import {Department, BloodType} from '../create-account/department.model';
import {Storage} from '@ionic/storage';
import {LoadingController} from '@ionic/angular';
import {PostProvider} from 'providers/post-provider';
import {DatePipe} from '@angular/common';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss']
})
export class MenuPage {
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
	email: '';
	blood: BloodType[] = [
		{type: 'A+'},
		{type: 'A-'},
		{type: 'B+'},
		{type: 'B-'},
		{type: 'AB+'},
		{type: 'AB-'},
		{type: 'O+'},
		{type: 'O-'}
	];
	departments: Department[] = [
		{id: 1, city: 'Ariana'},
		{id: 2, city: 'Ben Arous'},
		{id: 3, city: 'Béja'},
		{id: 4, city: 'Bizete'},
		{id: 5, city: 'Djerba'},
		{id: 6, city: 'Gafsa'},
		{id: 7, city: 'Jendouba'},
		{id: 8, city: 'Kairouan'},
		{id: 9, city: 'Kasserine'},
		{id: 10, city: 'Kebili'},
		{id: 11, city: 'Kef'},
		{id: 12, city: 'Manouba'},
		{id: 13, city: 'Mahdia'},
		{id: 14, city: 'Mednine'},
		{id: 15, city: 'Monastir'},
		{id: 16, city: 'Nabeul'},
		{id: 17, city: 'Siliana'},
		{id: 18, city: 'Sidi Bouzid'},
		{id: 19, city: 'Sfax'},
		{id: 20, city: 'Sousse'},
		{id: 21, city: 'Tataouine'},
		{id: 22, city: 'Tozeur'},
		{id: 23, city: 'Tunis'},
		{id: 24, city: 'Zaghouan'}
	];
	status: string;
	myDate: any = new Date();
	date = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
	user = {
		user_id: '',
		myphoto: '',
		phone: ''
	};
	bring: any;
	constructor(
		public navCtrl: NavController,
		private localNotifications: LocalNotifications,
		private router: Router,
		public menuCtrl: MenuController,
		private storage: Storage,
		public toastCtrl: ToastController,
		private postPvdr: PostProvider,
		public loadingCtrl: LoadingController,
		private datePipe: DatePipe,
		private platform: Platform,
		private statusBar: StatusBar
	) {
		this.storage.get('session_storage').then((res) => {
			this.bring = res;
			this.user.phone = res.phone;
			this.user.myphoto = this.bring.myphoto;
			this.userData.photo = this.bring.myphoto;
			this.userData.user_id = this.bring.user_id;
		});
		this.status = 'request';
		this.userData.myDate = this.date;
		console.log(this.date);
	}
	ionViewWillEnter() {
		this.menuCtrl.enable(true);
	}

	async CreateList() {
		if (
			!this.userData.phone ||
			!this.userData.name ||
			!this.userData.village ||
			!this.userData.bloodType
		) {
			const toast = await this.toastCtrl.create({
				message: 'Veuillez insérer correctement',
				duration: 2000
			});
			toast.present();
		} else if (this.userData.phone != this.user.phone) {
			const toast = await this.toastCtrl.create({
				message: 'Il faut utiliser le même numero de telephone !!',
				duration: 2000
			});
			toast.present();
			console.log(this.user.phone);
		} else {
			const body = {
				user_id: this.userData.user_id,
				feed_id: this.userData.feed_id,
				phone: this.userData.phone,
				name: this.userData.name,
				bloodType: this.userData.bloodType,
				village: this.userData.village,
				description: this.userData.description,
				date: this.userData.myDate,
				photo: this.userData.photo,
				aksi: 'feed'
			};
			if (!this.userData.description) {
				body.description = 'Aucune description donnée';
				this.userData.description = 'Aucune description donnée';
				// this.userData.bloodType = '';
				// this.userData.name = '';
				// this.userData.village = '';
			}
			this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
				const alertpesan = data.msg;
				if (data.success) {
					this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
						this.userData.myDate = this.date;
						this.storage.set('session_storage_list', this.userData);
					});
					this.router.navigate(['menu']);

					const toast = await this.toastCtrl.create({
						message: 'Liste créé avec succès',
						duration: 1000
					});
					toast.present();
					// Schedule delayed notification
					this.localNotifications.schedule({
						text: 'Liste créé avec succès',
						trigger: {at: new Date(new Date().getTime() + 3600)},
						led: 'FF0000',
						icon: '../../assets/DonDuSang_Logo-Recovered.png',
						title: 'Don Du Sang',
						sound: null
					});
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
	public bloodFn() {
		console.log(this.userData.bloodType);
	}
	public optionsFn() {
		console.log(this.userData.village);
	}
	showMap() {
		this.router.navigate(['map']);
	}
}
