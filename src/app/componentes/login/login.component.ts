import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { JwtClientServiceService } from 'src/app/servicios/jwt-client-service.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm:FormGroup
  loading=false;

//---------------


response:any;
/////


  constructor( private formBuilder:FormBuilder,
    private snackbar: MatSnackBar,
    private route:Router,
    private services:ServiciosService,
    private autenticacionService:AutenticacionService,
    private service:JwtClientServiceService
  ) { 

    this.loginForm=this.formBuilder.group({
      mail:['',[Validators.required,Validators.email]],
      pass:['',[Validators.required,Validators.minLength(1)]],
      deviceInfo:this.formBuilder.group({
        deviceId:["12121212121"],
        deviceType:["12121212121"],
        notificationToken:["67657575eececc34"]
        
      })
     
    })


  }

  ngOnInit(): void {


    




  }
 





  login(){
    if(this.loginForm.valid){
      if(this.loginForm.value.mail==="emanuel@dominio.com.ar" && this.loginForm.value.pass==="1234"){
        this.msjUsuarioValido()
        this.services.logen=true
        this.loadingLogin()
        
     }else{
      this.services.logen=false
      this.errorMsjUsuario()
      this.loginForm.reset()
      }
      
    }
  }


get Mail(){
  return this.loginForm.value.mail;
}
get Password(){
  return this.loginForm.value.pass;
}

  msjUsuarioValido(){  
    this.snackbar.open('Usuario Ingresado Correctamente', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStylo'],  
    });
  }

  errorMsjUsuario(){  
    this.snackbar.open('ERROR Usuario Invalido', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStyloError'], 
      
    });
  }

  loadingLogin(){
    this.loading=true;
    setTimeout(() => {
      this.route.navigate(['porfolio'])
      
      this.loading=false;
    }, 1500);
  }


  // login(event:Event){
  //   event.preventDefault;
  //   this.autenticacionService.iniciarSesion(this.loginForm.value).subscribe(data=>{
  //     console.log("DATA:" + JSON.stringify(data));
  //     this.route.navigate(['porfolio'])
    
  //   })
  
  }













