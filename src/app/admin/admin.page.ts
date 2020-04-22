import { Component, OnInit, ɵConsole } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  countPasswordWrong = 0;
  estado = "";
  showDialog: boolean = false;
  password = '';
  presionado: boolean = false;
  subscription: any;
  audioIzquierda = new Audio("../../assets/audios/estaHurtando.wav");
  audioDerecha = new Audio("../../assets/audios/esMio.wav");
  audioFlash = new Audio("../../assets/audios/flashOff.wav");
  audioVibrando = new Audio("../../assets/audios/vibrando.wav");
  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  mostrarDialog: boolean = true;
  // TEST
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;

  constructor(private screenOrientation: ScreenOrientation,
    private deviceMotion: DeviceMotion,
    private flashlight: Flashlight,
    private authService: AuthService,
    private vibration: Vibration
  ) {

  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  activarDesactivarAlarma() {
    if (this.presionado) {//si esta presionado entro para mostrar el dialog de deslogeo
      this.showDialog = true;
      if (this.password == this.authService.currentUser.password) {//verifico que la contraseña sea correcta
        this.audioFlash.loop=false;
        this.estado = "permitido"// muestro la doble tilde del html
        setTimeout(() => {
          this.presionado = false; //cambio el estado del boton
          this.estado = ""//muestro el icono de ingreso en html
          this.password = "";//borro el password de ingreso
          this.showDialog = false;//oculto el dialog
          this.stop();//dejo de estar subscripto al acceleration
          this.countPasswordWrong = 0;//reinicio el contador
        }, 1000);
      }
      else if (this.password != '') {
        this.countPasswordWrong++;
        this.estado = "denegado"// muestro la doble tilde del html
        setTimeout(() => {
          this.estado = ""//muestro el icono de ingreso en html
        }, 1000);
        if (this.countPasswordWrong >= 3) {
          this.audioFlash.loop=true;
          this.audioFlash.play();
        }
      }
    }
    else {
      this.presionado = true;
      this.start();
    }
  }
  closeDialog(){
    this.showDialog=false;
  }
  start() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if (acceleration.x > 3 && (acceleration.y >= -1 && acceleration.y <= 1)) {
        //Izquierda
        this.audioIzquierda.play();
        this.primerIngreso = false;
        this.primerIngresoFlash = true;
      }
      else if (acceleration.x < -3 && (acceleration.y >= -1 && acceleration.y <= 1)) {
        //derecha
        this.audioDerecha.play();
        this.primerIngreso = false;
        this.primerIngresoFlash = true;

      }
      else if (acceleration.y >= 9 && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //encender flash por 5 segundos y sonido
        this.audioFlash.play();
        if (this.primerIngresoFlash) {
          this.primerIngresoFlash ? this.flashlight.switchOn() : null;
          setTimeout(() => {
            this.primerIngresoFlash = false;
            this.flashlight.switchOff();
          }, 5000);
          this.primerIngreso = false;
        }
      }
      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.primerIngreso ? null : this.audioVibrando.play();
        this.primerIngreso ? null : this.vibration.vibrate(5000);
        this.primerIngresoFlash = true;
        this.primerIngreso = true;

      }

    });
  }
  stop() {
    this.mostrarDialog = true;
    this.primerIngreso = true;
    this.subscription.unsubscribe();
  }
}
