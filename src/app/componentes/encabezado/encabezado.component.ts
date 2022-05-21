import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EducacionFormComponent } from 'src/app/formulario/educacion-form/educacion-form.component';
import { EncabezadoFormComponent } from 'src/app/formulario/encabezado-form/encabezado-form.component';
import { Persona } from 'src/app/modelo/persona';
import { ServiciosService } from 'src/app/servicios/servicios.service';




@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  personas: Persona[] = [];
  constructor(private dialog:MatDialog, 
  private servicePersona:ServiciosService,
  private snackbar: MatSnackBar,
  private route:Router
   
 ) { }
   
  ngOnInit(): void {
   this.listarPersonas();
   this.servicePersona.logen=true

  }
 
  openDialog() {
    this.dialog.open(EncabezadoFormComponent, {
      
        width:'45%',
    }).afterClosed().subscribe(val=>{
      if(val='save'){
        this.listarPersonas();
      }
    });
  }

  openEditEncabezado(persona: any){
    this.dialog.open(EncabezadoFormComponent, {
      width:'45%',
      data:persona,
  }).afterClosed().subscribe(val=>{
    if(val='guardar'){
      this.listarPersonas();
    }
  });
}


  public listarPersonas(): void {

    this.servicePersona.getAllPersonas()
    .subscribe(
      data=>this.personas=data
      
    )
  }


    
eliminarPersona(id: number){
  this.servicePersona.eliminarPersona(id)
  .subscribe(
    {
      next: data=>{
        console.log(data);
        
        this.msjPersonaEliminada(id)
        this.listarPersonas()
       
      },
      error: err=>{
        this.errorMsjPersonaEliminada()
      
  }
})
}



msjPersonaEliminada(id:number){
  this.snackbar.open('EL Perfil numero Id: '+id+' se ha Eliminado', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStylo'],
  });
}

errorMsjPersonaEliminada(){  
this.snackbar.open('ERROR al Eliminar Persona', '', {
  duration: 3000,
  horizontalPosition: "center",
  verticalPosition:"top",
  panelClass: ['snackbarStyloError'], 
  
});
}



salirPorfolio(){
  this.servicePersona.logen=false
  this.route.navigate(['login'])
}








}
