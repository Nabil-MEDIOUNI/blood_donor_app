import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo: 'intro', pathMatch: 'full'},
	{path: 'home', loadChildren: './home/home.module#HomePageModule'},
	{path: 'intro', loadChildren: './intro/intro.module#IntroPageModule'},
	{
		path: 'create-account',
		loadChildren: './create-account/create-account.module#CreateAccountPageModule'
	},
	{path: 'menu', loadChildren: './menu/menu.module#MenuPageModule'},
	{
		path: 'connect-with-email',
		loadChildren:
			'./connect-with-email/connect-with-email.module#ConnectWithEmailPageModule'
	},
	{
		path: 'contact-us',
		loadChildren: './contact-us/contact-us.module#ContactUsPageModule'
	},
	{path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
	{path: 'list', loadChildren: './list/list.module#ListPageModule'},
	{
		path: 'inside-list',
		loadChildren: './inside-list/inside-list.module#InsideListPageModule'
	},
	{path: 'map', loadChildren: './map/map.module#MapPageModule'},
	{
		path: 'inside-list',
		loadChildren: './inside-list/inside-list.module#InsideListPageModule'
	},
	{
		path: 'settings',
		loadChildren: './settings/settings.module#SettingsPageModule'
	},
	{
		path: 'about-app',
		loadChildren: './about-app/about-app.module#AboutAppPageModule'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
