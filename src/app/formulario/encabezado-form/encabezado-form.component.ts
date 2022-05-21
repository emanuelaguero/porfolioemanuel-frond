import { HttpClientModule } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Persona } from 'src/app/modelo/persona';
import { MatDialogRef } from '@angular/material/dialog';
import { EncabezadoComponent } from 'src/app/componentes/encabezado/encabezado.component';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConditionalExpr } from '@angular/compiler';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {ref,getStorage,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import 'firebase/compat/storage'

@Component({
  selector: 'app-encabezado-form',
  templateUrl: './encabezado-form.component.html',
  styleUrls: ['./encabezado-form.component.css']
})
export class EncabezadoFormComponent implements OnInit {
perfilForm:FormGroup
personas: Persona[] = [];
PersonaModelo:Persona=new Persona()
actionBtn:String="Agregar"
  

  constructor(
    private formBuilder:FormBuilder, 
    private snackbar: MatSnackBar,
    private servicePersona:ServiciosService,
    private dialog:MatDialogRef<EncabezadoFormComponent>,
    private router:Router,
    
    @Inject(MAT_DIALOG_DATA) public editData:any ) { }
    
  ngOnInit(): void {
    
    this.perfilForm=this.formBuilder.group({
      personaNombre:['',Validators.required],
      personaProfesion:['',Validators.required],
      personaDireccion:[''],
      personaEmail:[''],
      personaTelefono:[''],
      personaLinkedin:[''],
      personaWeb:[''],
      personaAcerca:[''],
      personaFotoPerfil:[''],
      personaFotoPortada:[''],
    })

    if(this.editData){
      this.actionBtn="Modificar"
      this.perfilForm.controls['personaNombre'].setValue(this.editData.nombre)
      this.perfilForm.controls['personaProfesion'].setValue(this.editData.profesion)
      this.perfilForm.controls['personaDireccion'].setValue(this.editData.direccion)
      this.perfilForm.controls['personaTelefono'].setValue(this.editData.telefono)
      this.perfilForm.controls['personaWeb'].setValue(this.editData.web)
      this.perfilForm.controls['personaLinkedin'].setValue(this.editData.linkedin)
      this.perfilForm.controls['personaEmail'].setValue(this.editData.mail)
      this.perfilForm.controls['personaAcerca'].setValue(this.editData.acerca)
      this.perfilForm.controls['personaFotoPerfil'].setValue(this.editData.fotoPerfil)
      this.perfilForm.controls['personaFotoPortada'].setValue(this.editData.fotoPortada)
      
    }
    console.log(this.editData)
  }

  
  

  agregarPersona(){
  
    if(!this.editData){
      if(this.perfilForm.valid){
        console.log(this.perfilForm.value)
        this.PersonaModelo.nombre=this.perfilForm.value.personaNombre
        this.PersonaModelo.profesion=this.perfilForm.value.personaProfesion
        this.PersonaModelo.direccion=this.perfilForm.value.personaDireccion
        this.PersonaModelo.mail=this.perfilForm.value.personaEmail
        this.PersonaModelo.telefono=this.perfilForm.value.personaTelefono
        this.PersonaModelo.web=this.perfilForm.value.personaWeb
        this.PersonaModelo.linkedin=this.perfilForm.value.personaLinkedin
        this.PersonaModelo.acerca=this.perfilForm.value.personaAcerca
        this.PersonaModelo.fotoPerfil=this.perfilForm.value.personaFotoPerfil
        this.PersonaModelo.fotoPortada=this.perfilForm.value.personaFotoPortada
       
        this.servicePersona.postPersona(this.PersonaModelo)
        .subscribe(
          {
            next: data=>{
              
              this.perfilForm.reset();
              this.dialog.close('save');
              this.msjPersonaAgregada();
            },
            error: err=>{
              this.errorMsjPersonaAgregada()
            },
        }
      )}
    }else{
      this.modificarPersona();
    }
      
  }

modificarPersona(){
  this.PersonaModelo.nombre=this.perfilForm.value.personaNombre
  this.PersonaModelo.profesion=this.perfilForm.value.personaProfesion
  this.PersonaModelo.direccion=this.perfilForm.value.personaDireccion
  this.PersonaModelo.mail=this.perfilForm.value.personaEmail
  this.PersonaModelo.telefono=this.perfilForm.value.personaTelefono
  this.PersonaModelo.web=this.perfilForm.value.personaWeb
  this.PersonaModelo.linkedin=this.perfilForm.value.personaLinkedin
  this.PersonaModelo.acerca=this.perfilForm.value.personaAcerca
  if(this.banderaUrlImagenPerfil==true){
    this.PersonaModelo.fotoPerfil=this.urlImagenPerfil
  }else{
    this.PersonaModelo.fotoPerfil=this.perfilForm.value.personaFotoPerfil
  }
  if(this.banderaUrlImagenPortada==true){
    this.PersonaModelo.fotoPortada=this.urlImagenPortada
  }else{
    this.PersonaModelo.fotoPortada=this.perfilForm.value.personaFotoPortada
  }
  //
  //
  console.log(this.PersonaModelo.acerca)
  this.servicePersona.putPersona(this.PersonaModelo,this.editData.id)
  
.subscribe({
  next:data=>{
    
    this.perfilForm.reset();
    this.dialog.close("Modificar");
    this.msjPersonaActualizada()
  },
  error:()=>{
    this.errorMsjPersonaModificada()
  },
})
}  







  msjPersonaAgregada(){  
    this.snackbar.open('EL Perfil se ha Actualizado Correctamente', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStylo'],  
    });
  }

  msjPersonaActualizada(){
      this.snackbar.open('EL Perfil se ha Actualizado Correctamente', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStylo'],
      });
  }

  errorMsjPersonaAgregada(){  
    this.snackbar.open('ERROR al Agregar Persona', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStyloError'], 
      
    });
}

errorMsjPersonaModificada(){  
  this.snackbar.open('ERROR al Actualizar Persona', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStyloError'],
  });
}


/////////imagen perfil
  banderaCargarPerfil:boolean=false
  imagenesPerfil:any[]=[];
  urlImagenPerfil: string
  banderaUrlImagenPerfil:boolean=false
  
  private progressPerfil:any
  public filePerfil:any={}
  subirImagenPerfil(event){
    this.banderaUrlImagenPerfil=true
    this.banderaCargarPerfil=true
    this.perfilForm.invalid;
    let readerPerfil=new FileReader();
    this.filePerfil=event.target.files[0];
    readerPerfil.readAsDataURL(this.filePerfil)
    readerPerfil.onloadend=()=>{
      
      this.imagenesPerfil.push(readerPerfil.result);
    }
   
    const storagePerfil=getStorage();
    const storageRef=ref(storagePerfil,"perfil/"+this.filePerfil.name+Date.now());
    const uploadTask=uploadBytesResumable(storageRef,this.filePerfil)
    uploadTask.on('state_changed',
      (snapshot)=>{
        this.progressPerfil=((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(2)
        console.log('uploas is' + this.progressPerfil +'%done')
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURLPerfil)=>{
          this.urlImagenPerfil=downLoadURLPerfil
        console.log("file is link", downLoadURLPerfil);
        this.banderaCargarPerfil=false
        });
      }
    )
  }


/////////imagen portada


imagenesPortada:any[]=[];
  urlImagenPortada: string
  banderaUrlImagenPortada:boolean=false

  private progressPortada:any
  public filePortada:any={}
  subirImagenPortada(event){
    this.banderaUrlImagenPortada=true
    this.banderaCargarPerfil=true
    let readerPortada=new FileReader();
    this.filePortada=event.target.files[0];
    readerPortada.readAsDataURL(this.filePortada)
    readerPortada.onloadend=()=>{
      
      this.imagenesPortada.push(readerPortada.result);
    }
   
    const storagePortada=getStorage();
    const storageRef=ref(storagePortada,"portada/"+this.filePortada.name+Date.now());
    const uploadTask=uploadBytesResumable(storageRef,this.filePortada)
    uploadTask.on('state_changed',
      (snapshot)=>{
        this.progressPortada=((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(2)
        console.log('uploas is' + this.progressPortada +'%done')
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURLPortada)=>{
          
          console.log("file is link", downLoadURLPortada);
          this.urlImagenPortada=downLoadURLPortada
          this.banderaCargarPerfil=false
  
        });
      }
    )
  }





  
}
