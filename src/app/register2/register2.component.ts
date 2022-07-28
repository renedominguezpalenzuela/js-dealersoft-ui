import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  constructor() { }


  AuthUser:any = null;

  ngOnInit(): void {
    //recargar la pagina
  }

  register2(){
    //si todo ok actualizar el flag: "full_registration" para poder acceder a las otras rutas
    if (sessionStorage.getItem('Auth-User')) {
      this.AuthUser  =   JSON.parse(<string>sessionStorage.getItem('Auth-User'));
      this.AuthUser.full_registration=true;
      sessionStorage.setItem('Auth-User', JSON.stringify(this.AuthUser));
      console.log(this.AuthUser)
    } 

    
    if (localStorage.getItem('Auth-User')){
      this.AuthUser  =   JSON.parse(<string>localStorage.getItem('Auth-User'));
      this.AuthUser.full_registration=true;
      localStorage.setItem('Auth-User', JSON.stringify(this.AuthUser));
    }
    
  }

}
