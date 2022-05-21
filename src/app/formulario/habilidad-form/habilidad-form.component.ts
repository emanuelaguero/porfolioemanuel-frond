import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Habilidad } from 'src/app/modelo/habilidad';
import { ServiciosService } from 'src/app/servicios/servicios.service';


interface nConocimiento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-habilidad-form',
  templateUrl: './habilidad-form.component.html',
  styleUrls: ['./habilidad-form.component.css']
})
export class HabilidadFormComponent implements OnInit {

  nConocimientos: nConocimiento[] = [
    
    {value: '10', viewValue: '10%'},
    {value: '20', viewValue: '20%'},
    {value: '30', viewValue: '30%'},
    {value: '40', viewValue: '40%'},
    {value: '50', viewValue: '50%'},
    {value: '60', viewValue: '60%'},
    {value: '70', viewValue: '70%'},
    {value: '80', viewValue: '80%'},
    {value: '90', viewValue: '90%'},
    {value: '100', viewValue: '100%'},
    
  ];
  habilidadForm:FormGroup
  habilidades: Habilidad[] = [];
  HabilidadModelo:Habilidad=new Habilidad()
  actionBtn:String="Agregar"
  nivHabilidad:number

  constructor(

    private formBuilderHabilidad:FormBuilder, 
    private snackbarHabilidad: MatSnackBar,
    private serviceHabilidad:ServiciosService,
    private dialog:MatDialogRef<HabilidadFormComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public editDataHabilidad:any



  ) { }

  ngOnInit(): void {

    this.habilidadForm=this.formBuilderHabilidad.group({
      nombreHabilidad:['',Validators.required],
      porcHabilidad:['',Validators.required],
     
     
     
    })


    if(this.editDataHabilidad){
      this.actionBtn="Modificar"
      this.habilidadForm.controls['nombreHabilidad'].setValue(this.editDataHabilidad.nombreHabilidad)
      this.habilidadForm.controls['porcHabilidad'].setValue(this.editDataHabilidad.porcHabilidad)
      
      
    }
    console.log(this.editDataHabilidad)
  }

  
  

  agregarHabilidad(){
  
    if(!this.editDataHabilidad){
      if(this.habilidadForm.valid){
        console.log(this.habilidadForm.value)
        this.HabilidadModelo.nombreHabilidad=this.habilidadForm.value.nombreHabilidad
        this.HabilidadModelo.porcHabilidad=this.habilidadForm.value.porcHabilidad
        this.nivHabilidad=this.habilidadForm.value.porcHabilidad
        
        if (this.nivHabilidad>0 && this.nivHabilidad<=20){
          this.HabilidadModelo.nivelHabilidad="Basico"
        }else if(this.nivHabilidad>21 && this.nivHabilidad<=40){
          this.HabilidadModelo.nivelHabilidad="Principiante"
        }else if(this.nivHabilidad>40 && this.nivHabilidad<=60){
          this.HabilidadModelo.nivelHabilidad="Intermedio"
        }else if(this.nivHabilidad>61 && this.nivHabilidad<=80){
          this.HabilidadModelo.nivelHabilidad="Avanzado"
        }else if (this.nivHabilidad >81 && this.nivHabilidad<=100){
          this.HabilidadModelo.nivelHabilidad="Experto"
        }
        
        
       
        this.serviceHabilidad.postHabilidad(this.HabilidadModelo)
        .subscribe(
          {
            next: data=>{
              
              this.habilidadForm.reset();
              this.dialog.close('save');
              this.msjHabilidadAgregada();
            },
            error: err=>{
              this.errorMsjHabilidadAgregada()
            },
        }
      )}
    }else{
      
      this.modificarHabilidad();
    }
      
  }

modificarHabilidad(){
  this.HabilidadModelo.nombreHabilidad=this.habilidadForm.value.nombreHabilidad
  this.HabilidadModelo.porcHabilidad=this.habilidadForm.value.porcHabilidad
  
  this.nivHabilidad=this.habilidadForm.value.porcHabilidad
  console.log(this.nivHabilidad)
    if (this.nivHabilidad>0 && this.nivHabilidad<=20){
      this.HabilidadModelo.nivelHabilidad="Basico"
    }else if(this.nivHabilidad>21 && this.nivHabilidad<=40){
      this.HabilidadModelo.nivelHabilidad="Principiante"
    }else if(this.nivHabilidad>40 && this.nivHabilidad<=60){
      this.HabilidadModelo.nivelHabilidad="Intermedio"
    }else if(this.nivHabilidad>61 && this.nivHabilidad<=80){
      this.HabilidadModelo.nivelHabilidad="Avanzado"
    }else if (this.nivHabilidad >81 && this.nivHabilidad<=100){
      this.HabilidadModelo.nivelHabilidad="Experto"
    }

  this.serviceHabilidad.putHabilidad(this.HabilidadModelo,this.editDataHabilidad.idHabilidad)
  
.subscribe({
  next:data=>{
    
    this.habilidadForm.reset();
    this.dialog.close("Modificar");
    this.msjHabilidadActualizada()
  },
  error:()=>{
    this.errorMsjHabilidadModificada()
  },
})
}  







  msjHabilidadAgregada(){  
    this.snackbarHabilidad.open('La Habilidad se ha Actualizado Correctamente', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStylo'],  
    });
  }

  msjHabilidadActualizada(){
      this.snackbarHabilidad.open('La Habilidad se ha Actualizado Correctamente', '', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition:"top",
        panelClass: ['snackbarStylo'],
      });
  }

  errorMsjHabilidadAgregada(){  
    this.snackbarHabilidad.open('ERROR al Agregar Habilidad', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStyloError'], 
      
    });
}

errorMsjHabilidadModificada(){  
  this.snackbarHabilidad.open('ERROR al Actualizar Habilidad', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStyloError'],
  });
}

}















