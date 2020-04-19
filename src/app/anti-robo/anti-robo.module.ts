import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx'
import { IonicModule } from '@ionic/angular';
import { AntiRoboPage } from './anti-robo.page';

const routes: Routes = [
  {
    path: '',
    component: AntiRoboPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AntiRoboPage],
  providers:[DeviceMotion,Flashlight]
})
export class AntiRoboPageModule {}
