import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Department, BloodType} from './department.model';
import {PostProvider} from '../../../providers/post-provider';
import {NavController, ToastController} from '@ionic/angular';
let y = 1950;
let i = 0;

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.page.html',
	styleUrls: ['./create-account.page.scss']
})
export class CreateAccountPage {
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

	years = [];
	place: any;
	item: any;
	type: any;
	genders: any = ['Homme', 'Femme'];
	constructor(
		private postPvdr: PostProvider,
		public navCtrl: NavController,
		private router: Router,
		public toastCtrl: ToastController
	) {
		while (y < 2001) {
			this.years[i] = y;
			y = y + 1;
			i = i + 1;
		}
	}
	radioChanged(event: any) {
		this.user.sex = event.target.value;
		console.log(this.user.sex);
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

	async CreateAccount() {
		if (
			!this.user.phone ||
			!this.user.email ||
			!this.user.username ||
			!this.user.password ||
			!this.user.village ||
			!this.user.bloodType ||
			!this.user.passwordConfirmation
		) {
			const toast = await this.toastCtrl.create({
				message: 'Veuillez insérer correctement',
				duration: 2000
			});
			toast.present();
		} else if (this.user.password != this.user.passwordConfirmation) {
			const toast = await this.toastCtrl.create({
				message: 'Confirmation du mot de passe invalide',
				duration: 2000
			});
			toast.present();
		} else {
			let body = {
				phone: this.user.phone,
				email: this.user.email,
				username: this.user.username,
				password: this.user.password,
				bloodType: this.user.bloodType,
				passwordConfirmation: this.user.passwordConfirmation,
				sex: this.user.sex,
				village: this.user.village,
				date: this.user.date,
				myphoto: this.user.myphoto,
				aksi: 'add_register'
			};

			this.postPvdr.postData(body, 'file_aksi.php').subscribe(async (data) => {
				var alertpesan = data.msg;
				if (data.success) {
					this.router.navigate(['home']);
					const toast = await this.toastCtrl.create({
						message: 'Compte créé avec succès',
						duration: 2000
					});
					toast.present();
				} else {
					const toast = await this.toastCtrl.create({
						message: alertpesan,
						duration: 2000
					});
					toast.present();
				}
				console.log(alertpesan);
			});

			console.log(body);
		}
	}
}
