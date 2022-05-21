import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HabilidadFormComponent } from 'src/app/formulario/habilidad-form/habilidad-form.component';
import { Habilidad } from 'src/app/modelo/habilidad';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {
  habilidades: Habilidad[] = [];
  constructor(
    private dialog:MatDialog, 
    private serviceHabilidad:ServiciosService,
    private snackbar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.listarHabilidades();
   

  }

  openDialogHabilidad() {
    this.dialog.open(HabilidadFormComponent, {
      
        width:'30%',
    }).afterClosed().subscribe(val=>{
      if(val='save'){
        this.listarHabilidades();
      }
    });
  }

  openEditHabilidad(Habilidad: any){
    this.dialog.open(HabilidadFormComponent, {
      width:'30%',
      data:Habilidad,
  }).afterClosed().subscribe(val=>{
    if(val='guardar'){
      this.listarHabilidades();
    }
  });
}


  public listarHabilidades(): void {

    this.serviceHabilidad.getAllHabilidad()
    .subscribe(
      data=>this.habilidades=data
      
    )
  }


    
eliminarHabilidad(id: number){
  this.serviceHabilidad.eliminarHabilidad(id)
  .subscribe(
    {
      next: data=>{
        console.log(data);
        
        this.msjHabilidadEliminada(id)
        this.listarHabilidades()
       
      },
      error: err=>{
        this.errorMsjHabilidadEliminada()
      
  }
})
}



msjHabilidadEliminada(id:number){
  this.snackbar.open('La Habilidad numero Id: '+id+' se ha Eliminado', '', {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition:"top",
    panelClass: ['snackbarStylo'],
  });
}

errorMsjHabilidadEliminada(){  
this.snackbar.open('ERROR al Eliminar Habilidad', '', {
  duration: 3000,
  horizontalPosition: "center",
  verticalPosition:"top",
  panelClass: ['snackbarStyloError'], 
  
});
}







}
