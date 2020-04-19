import { Component, OnInit, Input } from '@angular/core';
import { DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { DeviceMotionAccelerometerOptions, DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
@Component({
  selector: 'app-anti-robo',
  templateUrl: './anti-robo.page.html',
  styleUrls: ['./anti-robo.page.scss'],
})
export class AntiRoboPage implements OnInit {

  presionado: boolean = false;

  x: number;
  y: number;
  z: number;
  flashState: boolean = false;
  timeStamp: number;
  mostrar: string;
  subscription: any;
  vibrando: boolean;
  id: any;
  audioIzquierda = new Audio("../../assets/audios/estaHurtando.wav");
  audioDerecha = new Audio("../../assets/audios/esMio.wav");
  audioFlashOff = new Audio("../../assets/audios/flashOff.wav");
  audioVibrando = new Audio("../../assets/audios/vibrando.wav");
  contadorFlash: number = 0;
  contadorVibrador: number = 0;
  public screenOrientation: ScreenOrientation = new ScreenOrientation();

  constructor(public deviceMotion: DeviceMotion,
    public flashlight: Flashlight,
    private vibration: Vibration,
  ) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  start() {

    try {
      var options: DeviceMotionAccelerometerOptions = {
        frequency: 300//800
      };
      this.id = this.deviceMotion.watchAcceleration(options).subscribe((acc: DeviceMotionAccelerationData) => {
        this.x = Math.floor(acc.x);
        this.y = Math.floor(acc.y);
        this.z = Math.floor(acc.z);

        if (this.z == 0 && this.y > 7 && this.x < 3 && this.contadorFlash == 0) {
          this.flashlight.switchOn();

          this.verificarReproduccionFlash();
          setTimeout(() => {
            this.flashlight.switchOff();
            this.audioFlashOff.play();
          }, 5000);

        }
        else if (this.z == 0 && this.y==0 ) {
           this.verificarReproduccionVibrador();
        }
        else if (this.x >= 0 && this.x <= 1 && this.y >= 0 && this.y <= 1) {
          this.audioIzquierda.pause();
          this.audioFlashOff.pause();
          this.audioDerecha.pause();
          setTimeout(() => {
            this.contadorFlash = 0;
            this.contadorVibrador = 0;
          }, 2000);
        }
        else if (this.x < -2 && !this.vibrando) {
          // , “¡Están hurtando el dispositivo!”
          this.contadorFlash = 0;
          this.audioIzquierda.play();
          this.audioDerecha.pause();
          this.audioFlashOff.pause();
          setTimeout(() => {
            
            this.audioDerecha.currentTime = 0;
            this.audioFlashOff.currentTime = 0;
          }, 2000);
        }
        else if (this.x > 2 && !this.vibrando) {
          //  ,  “¡Epa! ¿Qué estás por hacer?”
          this.contadorFlash = 0;
          this.audioIzquierda.pause();
          this.audioFlashOff.pause();
          this.audioDerecha.play();
          setTimeout(() => {
            this.audioIzquierda.currentTime = 0;
            this.audioFlashOff.currentTime = 0;
          }, 2000);
        }

        // this.subscription.unsubscribe();
      });
    } catch (error) {
      console.info("ERROR en Start() anti-robo-page ", error);
    }
  }
  verificarReproduccionVibrador() {
    if (this.contadorVibrador === 0) {
      this.audioVibrando.play();
      // this.contadorVibrador++;
      this.vibrando = true;
      this.vibration.vibrate(5000);
      setTimeout(() => {
        this.vibrando = false;
      }, 5000);
    }
  }
  verificarReproduccionFlash() {

    if (this.contadorFlash === 0) {
      this.audioFlashOff.play();
      this.contadorFlash++;
    }
  }



  stop() {
    this.id.unsubscribe();
    this.audioDerecha.pause();
    this.audioIzquierda.pause();;
    this.audioFlashOff.pause();
    this.contadorFlash = 0;
    this.contadorVibrador = 0;
  }
  activarDesactivarAlarma() {
    if (this.presionado) {
      this.presionado = false;
      this.stop();
    }
    else {
      this.presionado = true;
      this.start();
    }
  }
}
