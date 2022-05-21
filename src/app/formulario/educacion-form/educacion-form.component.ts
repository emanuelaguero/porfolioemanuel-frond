import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/modelo/educacion';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { EncabezadoFormComponent } from '../encabezado-form/encabezado-form.component';
import {ref,getStorage,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import 'firebase/compat/storage'
@Component({
  selector: 'app-educacion-form',
  templateUrl: './educacion-form.component.html',
  styleUrls: ['./educacion-form.component.css']
})
export class EducacionFormComponent implements OnInit {

  educacionForm:FormGroup
  educaciones: Educacion[] = [];
  EducacionModelo:Educacion=new Educacion()
  actionBtn:String="Agregar"
    
  
    constructor(
      private formBuilderEducacion:FormBuilder, 
      private snackbarEducacion: MatSnackBar,
      private serviceEducacion:ServiciosService,
      private dialog:MatDialogRef<EncabezadoFormComponent>,
      private router:Router,
      @Inject(MAT_DIALOG_DATA) public editDataEducacion:any ) { }
  
    ngOnInit(): void {
      
      this.educacionForm=this.formBuilderEducacion.group({
        nombreInstitucion:['',Validators.required],
        nombreCurso:['',Validators.required],
        descActCurso:[''],
        fechaInicioCurso:[''],
        fechaFinCurso:[''],
        fotoInstitucion:[''],
       
      })
  
      if(this.editDataEducacion){
        this.actionBtn="Modificar"
        this.educacionForm.controls['nombreInstitucion'].setValue(this.editDataEducacion.nombreInstitucion)
        this.educacionForm.controls['nombreCurso'].setValue(this.editDataEducacion.nombreCurso)
        this.educacionForm.controls['descActCurso'].setValue(this.editDataEducacion.descActCurso)
        this.educacionForm.controls['fechaInicioCurso'].setValue(this.editDataEducacion.fechaInicioCurso)
        this.educacionForm.controls['fechaFinCurso'].setValue(this.editDataEducacion.fechaFinCurso)
        this.educacionForm.controls['fotoInstitucion'].setValue(this.editDataEducacion.fotoInstitucion)
      
        
      }
     
    }
  
    
    
  
    agregarEducacion(){
    
      if(!this.editDataEducacion){
        if(this.educacionForm.valid){
         
          this.EducacionModelo.nombreInstitucion=this.educacionForm.value.nombreInstitucion
          this.EducacionModelo.nombreCurso=this.educacionForm.value.nombreCurso
          this.EducacionModelo.descActCurso=this.educacionForm.value.descActCurso
          this.EducacionModelo.fechaInicioCurso=this.educacionForm.value.fechaInicioCurso
          this.EducacionModelo.fechaFinCurso=this.educacionForm.value.fechaFinCurso
          //this.EducacionModelo.fotoInstitucion=this.educacionForm.value.fotoInstitucion
          if(this.banderaUrlImagenEducacion==true){
            this.EducacionModelo.fotoInstitucion=this.urlImagenEducacion
          }else{
            this.EducacionModelo.fotoInstitucion=this.educacionForm.value.fotoInstitucion
          }
          
          
         
          this.serviceEducacion.postEducacion(this.EducacionModelo)
          .subscribe(
            {
              next: data=>{
                
                this.educacionForm.reset();
                this.dialog.close('save');
                this.msjEducacionAgregada();
              },
              error: err=>{
                this.errorMsjEducacionAgregada()
              },
          }
        )}
      }else{
        
        this.modificarEducacion();
      }
        
    }
  
  modificarEducacion(){
    this.EducacionModelo.nombreInstitucion=this.educacionForm.value.nombreInstitucion
    this.EducacionModelo.nombreCurso=this.educacionForm.value.nombreCurso
    this.EducacionModelo.descActCurso=this.educacionForm.value.descActCurso
    this.EducacionModelo.fechaInicioCurso=this.educacionForm.value.fechaInicioCurso
    this.EducacionModelo.fechaFinCurso=this.educacionForm.value.fechaFinCurso
    //this.EducacionModelo.fotoInstitucion=this.educacionForm.value.fotoInstitucion
    if(this.banderaUrlImagenEducacion==true){
      this.EducacionModelo.fotoInstitucion=this.urlImagenEducacion
    }else{
      this.EducacionModelo.fotoInstitucion=this.educacionForm.value.fotoInstitucion
    }
   
    this.serviceEducacion.putEducacion(this.EducacionModelo,this.editDataEducacion.idEducacion)
    
  .subscribe({
    next:data=>{
      
      this.educacionForm.reset();
      this.dialog.close("Modificar");
      this.msjEducacionActualizada()
    },
    error:()=>{
      this.errorMsjEducacionModificada()
    },
  })
  }  
  
  
  
  
  
  
  
    msjEducacionAgregada(){  
      this.snackbarEducacion.open('La Educacion se ha Actualizado Correctamente', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStylo'],  
      });
    }
  
    msjEducacionActualizada(){
        this.snackbarEducacion.open('La Educacion se ha Actualizado Correctamente', '', {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition:"top",
          panelClass: ['snackbarStylo'],
        });
    }
  
    errorMsjEducacionAgregada(){  
      this.snackbarEducacion.open('ERROR al Agregar Educacion', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStyloError'], 
        
      });
  }
  
  errorMsjEducacionModificada(){  
    this.snackbarEducacion.open('ERROR al Actualizar Educacion', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStyloError'],
    });
  }
  




/////////imagen Educacion
banderaCargarEducacion:boolean=false
imagenesEducacion:any[]=[];
urlImagenEducacion: string
banderaUrlImagenEducacion:boolean=false

private progressEducacion:any
public fileEducacion:any={}
subirImagenEducacion(event){
  this.banderaUrlImagenEducacion=true
  this.banderaCargarEducacion=true
  this.educacionForm.invalid;
  let readerEducacion=new FileReader();
  this.fileEducacion=event.target.files[0];
  readerEducacion.readAsDataURL(this.fileEducacion)
  readerEducacion.onloadend=()=>{
    
    this.imagenesEducacion.push(readerEducacion.result);
  }
 
  const storageEducacion=getStorage();
  const storageRef=ref(storageEducacion,"educacion/"+this.fileEducacion.name+Date.now());
  const uploadTask=uploadBytesResumable(storageRef,this.fileEducacion)
  uploadTask.on('state_changed',
    (snapshot)=>{
      this.progressEducacion=((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(2)
      console.log('uploas is' + this.progressEducacion +'%done')
    },
    (error)=>{
      console.log(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downLoadURLEducacion)=>{
        this.urlImagenEducacion=downLoadURLEducacion
      console.log("file is link", downLoadURLEducacion);
      this.banderaCargarEducacion=false
      });
    }
  )
}





  }
  