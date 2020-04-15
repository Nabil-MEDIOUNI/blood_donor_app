import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PostProvider} from '../../providers/post-provider';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {FormsModule, EmailValidator} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Network} from '@ionic-native/network/ngx';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],

	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,

		HttpModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		FormsModule
	],
	providers: [
		StatusBar,
		LocalNotifications,
		SplashScreen,
		PostProvider,
		Network,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
		Facebook,
		GooglePlus,
		EmailComposer,
		EmailValidator,
		Camera,
		DatePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
