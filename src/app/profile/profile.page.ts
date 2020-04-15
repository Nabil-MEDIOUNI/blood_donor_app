import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {BloodType, Department} from '../create-account/department.model';
import {PostProvider} from 'providers/post-provider';
import {
	ToastController,
	MenuController,
	LoadingController
} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
let y = 1950;
let i = 0;
@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
	blood: BloodType[] = [
		{type: 'A-positive (A+)'},
		{type: 'A-negative (A-)'},
		{type: 'B-positive (B+)'},
		{type: 'B-negative (B-)'},
		{type: 'AB-positive (AB+)'},
		{type: 'AB-negative (AB-)'},
		{type: 'O-positive (O+)'},
		{type: 'O-negative (O-)'}
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
		myphoto: '../../assets/user.png'
	};
	years = [];
	bring: any;
	genders: any = ['Homme', 'Femme'];

	constructor(
		public toastCtrl: ToastController,
		private router: Router,
		private storage: Storage,
		private postPvdr: PostProvider,
		public loadingCtrl: LoadingController,
		public menuCtrl: MenuController,
		private camera: Camera
	) {
		while (y < 2001) {
			this.years[i] = y;
			y = y + 1;
			i = i + 1;
		}
		this.ionViewWillEnter();
	}

	ionViewWillEnter() {
		this.storage.get('session_storage').then((res) => {
			this.bring = res;
			this.user.email = this.bring.email;
			this.user.username = this.bring.username;
			this.user.bloodType = this.bring.bloodType;
			this.user.sex = this.bring.sex;
			this.user.date = this.bring.date;
			this.user.village = this.bring.village;
			this.user.user_id = this.bring.user_id;
			this.user.myphoto = this.bring.myphoto;
			this.user.password = this.bring.password;
			console.log(this.bring);
			this.menuCtrl.enable(false);
		});
	}
	radioChanged(event: any) {
		this.user.sex = event.target.value;
		console.log('here gender' + this.user.sex);
	}
	public bloodFn() {
		console.log(this.user.bloodType);
	}
	public optionsFn() {
		console.log(this.user.village);
	}
	public yearsFn() {
		console.log(this.user.date);
	}
	go_back() {
		this.router.navigate(['menu']);
	}
	picture() {
		const options: CameraOptions = {
			quality: 70,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum: false
		};

		this.camera.getPicture(options).then(
			(imageData) => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64:
				this.user.myphoto = 'data:image/jpeg;base64,' + imageData;
			},
			(err) => {
				// Handle error
			}
		);
		console.log(this.user.myphoto);
	}
	async modify() {
		if (
			!this.user.password ||
			this.user.password !== this.user.passwordConfirmation
		) {
			const toast = await this.toastCtrl.create({
				message: 'Mot de passe invalide',
				duration: 2000
			});
			toast.present();
		} else {
			let body = {
				username: this.user.username,
				email: this.user.email,
				password: this.user.password,
				user_id: this.user.user_id,
				bloodType: this.user.bloodType,
				date: this.user.date,
				sex: this.user.sex,
				village: this.user.village,
				passwordConfirmation: this.user.passwordConfirmation,
				myphoto: this.user.myphoto,
				aksi: 'profile'
			};
			this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
				var alertpesan = data.msg;
				if (data.success) {
					this.bring.username = this.user.username;
					this.bring.email = this.user.email;
					this.bring.password = this.user.password;
					this.bring.passwordConfirmation = this.user.passwordConfirmation;
					this.bring.bloodType = this.user.bloodType;
					this.bring.date = this.user.date;
					this.bring.sex = this.user.sex;
					this.bring.village = this.user.village;
					this.bring.myphoto = this.user.myphoto;
					this.storage.set('session_storage', this.bring);
					let loading = await this.loadingCtrl.create({
						message: 'mise à jour...'
					});
					loading.present();
					setTimeout(() => {
						loading.dismiss();
						window.location.assign('/profile');
					}, 2000);
				} else {
					const toast = await this.toastCtrl.create({
						message: alertpesan,
						duration: 2000
					});
					toast.present();
				}
			});
			console.log(this.user.myphoto);
		}
	}
}
