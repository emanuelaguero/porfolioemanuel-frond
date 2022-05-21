import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelo/proyecto';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-proyecto-form',
  templateUrl: './proyecto-form.component.html',
  styleUrls: ['./proyecto-form.component.css']
})
export class ProyectoFormComponent implements OnInit {
  proyectoForm:FormGroup
  proyectos: Proyecto[] = [];
  ProyectoModelo:Proyecto=new Proyecto()
  actionBtn:String="Agregar"
  constructor(
    private formBuilderProyecto:FormBuilder, 
      private snackbarProyecto: MatSnackBar,
      private serviceProyecto:ServiciosService,
      private dialog:MatDialogRef<ProyectoFormComponent>,
      private router:Router,
      @Inject(MAT_DIALOG_DATA) public editDataProyecto:any 
  ) { }

  ngOnInit(): void {

 
    this.proyectoForm=this.formBuilderProyecto.group({
      nombreProyecto:['',Validators.required],
      descProyecto:[''],
      urlProyecto :[''],

  })



  if(this.editDataProyecto){
    this.actionBtn="Modificar"
    this.proyectoForm.controls['nombreProyecto'].setValue(this.editDataProyecto.nombreProyecto)
    this.proyectoForm.controls['descProyecto'].setValue(this.editDataProyecto.descProyecto)
    this.proyectoForm.controls['urlProyecto'].setValue(this.editDataProyecto.urlProyecto)
  
    
  }
  console.log(this.editDataProyecto)
}




agregarProyecto(){

  if(!this.editDataProyecto){
    if(this.proyectoForm.valid){
      console.log(this.proyectoForm.value)
      this.ProyectoModelo.nombreProyecto=this.proyectoForm.value.nombreProyecto
      this.ProyectoModelo.descProyecto=this.proyectoForm.value.descProyecto
      this.ProyectoModelo.urlProyecto=this.proyectoForm.value.urlProyecto
      console.log(this.ProyectoModelo)
      
     
      this.serviceProyecto.postProyecto(this.ProyectoModelo)
      .subscribe(
        {
          next: data=>{
            
            this.proyectoForm.reset();
            this.dialog.close('save');
            this.msjProyectoAgregado();
          },
          error: err=>{
            this.errorMsjProyectoAgregado()
          },
      }
    )}
  }else{
    
    this.modificarProyecto();
  }
    
}

modificarProyecto(){
  this.ProyectoModelo.nombreProyecto=this.proyectoForm.value.nombreProyecto
  this.ProyectoModelo.descProyecto=this.proyectoForm.value.descProyecto
  this.ProyectoModelo.urlProyecto=this.proyectoForm.value.urlProyecto

this.serviceProyecto.putProyecto(this.ProyectoModelo,this.editDataProyecto.idProyecto)

.subscribe({
next:data=>{
  
  this.proyectoForm.reset();
  this.dialog.close("Modificar");
  this.msjProyectoActualizado()
},
error:()=>{
  this.errorMsjProyectoModificado()
},
})
}  







msjProyectoAgregado(){  
  this.snackbarProyecto.open('El Proyecto se ha Actualizado Correctamente', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStylo'],  
  });
}

msjProyectoActualizado(){
    this.snackbarProyecto.open('La Proyecto se ha Actualizado Correctamente', '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition:"top",
      panelClass: ['snackbarStylo'],
    });
}

errorMsjProyectoAgregado(){  
  this.snackbarProyecto.open('ERROR al Agregar Proyecto', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStyloError'], 
    
  });
}

errorMsjProyectoModificado(){  
this.snackbarProyecto.open('ERROR al Actualizar Proyecto', '', {
  duration: 3000,
  horizontalPosition: "center",
  verticalPosition:"top",
  panelClass: ['snackbarStyloError'],
});
}

}
