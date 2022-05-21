import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducacionFormComponent } from 'src/app/formulario/educacion-form/educacion-form.component';
import { Educacion } from 'src/app/modelo/educacion';

import { ServiciosService } from 'src/app/servicios/servicios.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}









@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: Educacion[] = [];
  constructor(private dialog:MatDialog, 
  private serviceEducacion:ServiciosService,
  
  private snackbar: MatSnackBar,
 ) { }
   
  ngOnInit(): void {
   this.listarEducacion();
   

  }

  fotoVacia(){
    for (let ed of this.educaciones){
      if(ed.fotoInstitucion===""){
        return "vacia"
      }else{
        return "llena"
      }
    

    }

  }
  openDialogEducacion() {
    this.dialog.open(EducacionFormComponent, {
      
        width:'45%',
    }).afterClosed().subscribe(val=>{
      if(val='save'){
        this.listarEducacion();
      }
    });
  }

  openEditEducacion(educacion: any){
    this.dialog.open(EducacionFormComponent, {
      width:'45%',
      data:educacion,
  }).afterClosed().subscribe(val=>{
    if(val='guardar'){
      this.listarEducacion();
    }
  });
}


  public listarEducacion(): void {

    this.serviceEducacion.getAllEducacion()
    .subscribe(
      data=>this.educaciones=data
      
    )}


    
eliminarEducacion(id: number){
  this.serviceEducacion.eliminarEducacion(id)
  .subscribe(
    {
      next: data=>{
        console.log(data);
        
        this.msjEducacionEliminada(id)
        this.listarEducacion()
       
      },
      error: err=>{
        this.errorMsjEducacionEliminada()
      
  }
})
}



msjEducacionEliminada(id:number){
  this.snackbar.open('EL Curso numero Id: '+id+' se ha Eliminado', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStylo'],
  });
}

errorMsjEducacionEliminada(){  
this.snackbar.open('ERROR al Eliminar Curso', '', {
  duration: 3000,
  horizontalPosition: "center",
  verticalPosition:"top",
  panelClass: ['snackbarStyloError'], 
  
});
}





}
