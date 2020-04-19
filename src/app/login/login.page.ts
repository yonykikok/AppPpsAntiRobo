import { Component, OnInit,EventEmitter } from '@angular/core';
import { User } from './../shared/user.class';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  usuarioSeleccionado:User=new User();

  usuarios: User[] = [{ id: 1, email: "admin@admin.com", password: "111111", perfil: "admin", sexo: "femenino" },
  { id: 2, email: "invitado@invitado.com", password: "222222", perfil: "invitado", sexo: "femenino" },
  { id: 3, email: "usuario@usuario.com", password: "333333", perfil: "usuario", sexo: "masculino" },
  { id: 4, email: "anonimo@anonimo.com", password: "444444", perfil: "usuario", sexo: "masculino" },
  { id: 5, email: "tester@tester.com", password: "555555", perfil: "tester", sexo: "femenino" }]
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  async OnLogin() {
    const user = await this.authService.OnLogin(this.user);
    if (user) {
      console.log('LOGEADO! :) ');
      this.router.navigateByUrl('/anti-robo');
    }
  }
  cargarUsuarioEnInput(usuario)
  {
    this.usuarioSeleccionado=usuario;
  }
}
