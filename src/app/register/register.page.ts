import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from '../services/auth.service';
import { User } from "./../shared/user.class";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user : User= new User();
  constructor(private authService:AuthService,private router:Router ) {

   }

  ngOnInit() {
  }
  async OnRegister(){
    const user= await this.authService.OnRegister(this.user);
    if(user)
    {
      console.log('Registro Exitoso');
      this.router.navigateByUrl('/');
    }
  }


}
