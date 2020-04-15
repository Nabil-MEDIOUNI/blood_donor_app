import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConnectWithEmailPage } from './connect-with-email.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectWithEmailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConnectWithEmailPage]
})
export class ConnectWithEmailPageModule {}
