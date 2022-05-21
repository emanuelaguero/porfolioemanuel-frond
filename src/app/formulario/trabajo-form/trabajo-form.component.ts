import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Trabajo } from 'src/app/modelo/trabajo';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import {ref,getStorage,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import 'firebase/compat/storage'


@Component({
  selector: 'app-trabajo-form',
  templateUrl: './trabajo-form.component.html',
  styleUrls: ['./trabajo-form.component.css']
})
export class TrabajoFormComponent implements OnInit {

  trabajoForm:FormGroup
  trabajos: Trabajo[] = [];
  TrabajoModelo:Trabajo=new Trabajo()
  actionBtn:String="Agregar"
    
  
    constructor(
      private formBuilderTrabajo:FormBuilder, 
      private snackbarTrabajo: MatSnackBar,
      private serviceTrabajo:ServiciosService,
      private dialog:MatDialogRef<TrabajoFormComponent>,
      private router:Router,
      @Inject(MAT_DIALOG_DATA) public editDataTrabajo:any ) { }
  
    ngOnInit(): void {
      
      this.trabajoForm=this.formBuilderTrabajo.group({
        nombreTrabajo:['',Validators.required],
        cargoTrabajo:['',Validators.required],
        descTareasTrabajo:[''],
        fechaIngresoTrabajo:[''],
        fechaEgresoTrabajo:[''],
        fotoTrabajoEmpresa :[''],
       
      })
  
      if(this.editDataTrabajo){
        this.actionBtn="Modificar"
        this.trabajoForm.controls['nombreTrabajo'].setValue(this.editDataTrabajo.nombreTrabajo)
        this.trabajoForm.controls['cargoTrabajo'].setValue(this.editDataTrabajo.cargoTrabajo)
        this.trabajoForm.controls['descTareasTrabajo'].setValue(this.editDataTrabajo.descTareasTrabajo)
        this.trabajoForm.controls['fechaIngresoTrabajo'].setValue(this.editDataTrabajo.fechaIngresoTrabajo)
        this.trabajoForm.controls['fechaEgresoTrabajo'].setValue(this.editDataTrabajo.fechaEgresoTrabajo)
        this.trabajoForm.controls['fotoTrabajoEmpresa'].setValue(this.editDataTrabajo.fotoTrabajoEmpresa)
      
        
      }
      console.log(this.editDataTrabajo)
    }
  
    
    
  
    agregarTrabajo(){
    
      if(!this.editDataTrabajo){
        if(this.trabajoForm.valid){
          console.log(this.trabajoForm.value)
          this.TrabajoModelo.nombreTrabajo=this.trabajoForm.value.nombreTrabajo
          this.TrabajoModelo.cargoTrabajo=this.trabajoForm.value.cargoTrabajo
          this.TrabajoModelo.descTareasTrabajo=this.trabajoForm.value.descTareasTrabajo
          this.TrabajoModelo.fechaIngresoTrabajo=this.trabajoForm.value.fechaIngresoTrabajo
          this.TrabajoModelo.fechaEgresoTrabajo=this.trabajoForm.value.fechaEgresoTrabajo
          //this.TrabajoModelo.fotoTrabajoEmpresa=this.trabajoForm.value.fotoTrabajoEmpresa
          if(this.banderaUrlImagenTrabajo==true){
            this.TrabajoModelo.fotoTrabajoEmpresa=this.urlImagenTrabajo
          }else{
            this.TrabajoModelo.fotoTrabajoEmpresa=this.trabajoForm.value.fotoTrabajoEmpresa
          }
          console.log(this.TrabajoModelo)
          
         
          this.serviceTrabajo.postTrabajo(this.TrabajoModelo)
          .subscribe(
            {
              next: data=>{
                
                this.trabajoForm.reset();
                this.dialog.close('save');
                this.msjTrabajoAgregado();
              },
              error: err=>{
                this.errorMsjTrabajoAgregado()
              },
          }
        )}
      }else{
        
        this.modificarTrabajo();
      }
        
    }
  
  modificarTrabajo(){
    this.TrabajoModelo.nombreTrabajo=this.trabajoForm.value.nombreTrabajo
    this.TrabajoModelo.cargoTrabajo=this.trabajoForm.value.cargoTrabajo
    this.TrabajoModelo.descTareasTrabajo=this.trabajoForm.value.descTareasTrabajo
    this.TrabajoModelo.fechaIngresoTrabajo=this.trabajoForm.value.fechaIngresoTrabajo
    this.TrabajoModelo.fechaEgresoTrabajo=this.trabajoForm.value.fechaEgresoTrabajo
    //this.TrabajoModelo.fotoTrabajoEmpresa=this.trabajoForm.value.fotoTrabajoEmpresa
    if(this.banderaUrlImagenTrabajo==true){
      this.TrabajoModelo.fotoTrabajoEmpresa=this.urlImagenTrabajo
    }else{
      this.TrabajoModelo.fotoTrabajoEmpresa=this.trabajoForm.value.fotoTrabajoEmpresa
    }



    this.serviceTrabajo.putTrabajo(this.TrabajoModelo,this.editDataTrabajo.idTrabajo)
    
  .subscribe({
    next:data=>{
      
      this.trabajoForm.reset();
      this.dialog.close("Modificar");
      this.msjTrabajoActualizado()
    },
    error:()=>{
      this.errorMsjTrabajoModificado()
    },
  })
  }  
  
  
  
  
  
  
  
    msjTrabajoAgregado(){  
      this.snackbarTrabajo.open('El Trabajo se ha Actualizado Correctamente', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStylo'],  
      });
    }
  
    msjTrabajoActualizado(){
        this.snackbarTrabajo.open('La Trabajo se ha Actualizado Correctamente', '', {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition:"top",
          panelClass: ['snackbarStylo'],
        });
    }
  
    errorMsjTrabajoAgregado(){  
      this.snackbarTrabajo.open('ERROR al Agregar Trabajo', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStyloError'], 
        
      });
  }
  
  errorMsjTrabajoModificado(){  
    this.snackbarTrabajo.open('ERROR al Actualizar Trabajo', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStyloError'],
    });
  }
  



/////////imagen Trabajo
banderaCargarTrabajo:boolean=false
imagenesTrabajo:any[]=[];
urlImagenTrabajo: string
banderaUrlImagenTrabajo:boolean=false

private progressTrabajo:any
public fileTrabajo:any={}
subirImagenTrabajo(event){
  this.banderaUrlImagenTrabajo=true
  this.banderaCargarTrabajo=true
  this.trabajoForm.invalid;
  let readerTrabajo=new FileReader();
  this.fileTrabajo=event.target.files[0];
  readerTrabajo.readAsDataURL(this.fileTrabajo)
  readerTrabajo.onloadend=()=>{
    
    this.imagenesTrabajo.push(readerTrabajo.result);
  }
 
  const storageTrabajo=getStorage();
  const storageRef=ref(storageTrabajo,"trabajo/"+this.fileTrabajo.name+Date.now());
  const uploadTask=uploadBytesResumable(storageRef,this.fileTrabajo)
  uploadTask.on('state_changed',
    (snapshot)=>{
      this.progressTrabajo=((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(2)
      console.log('uploas is' + this.progressTrabajo +'%done')
    },
    (error)=>{
      console.log(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downLoadURLTrabajo)=>{
        this.urlImagenTrabajo=downLoadURLTrabajo
      console.log("file is link", downLoadURLTrabajo);
      this.banderaCargarTrabajo=false
      });
    }
  )
}















  
  }
  