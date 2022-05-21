import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import {Trabajo} from 'src/app/modelo/trabajo';
import { TrabajoFormComponent } from 'src/app/formulario/trabajo-form/trabajo-form.component';
@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {
  trabajos: Trabajo[] = [];
 
  constructor(
    private dialog:MatDialog, 
  private serviceTrabajo:ServiciosService,
  
  private snackbar: MatSnackBar,
  ) { }
  
  ngOnInit(): void {
    this.listarTrabajo();
    
 
   }
 
   openDialogTrabajo() {
     this.dialog.open(TrabajoFormComponent, {
       
         width:'45%',
     }).afterClosed().subscribe(val=>{
       if(val='save'){
         this.listarTrabajo();
       }
     });
   }
 
   openEditTrabajo(trabajo: any){
     this.dialog.open(TrabajoFormComponent, {
       width:'45%',
       data:trabajo,
   }).afterClosed().subscribe(val=>{
     if(val='guardar'){
       this.listarTrabajo();
     }
   });
 }
 
 
   public listarTrabajo(): void {
 
     this.serviceTrabajo.getAllTrabajos()
     .subscribe(
       data=>this.trabajos=data
       
     )}
 
 
     
 eliminarTrabajo(id: number){
   this.serviceTrabajo.eliminarTrabajo(id)
   .subscribe(
     {
       next: data=>{
         console.log(data);
         
         this.msjTrabajoEliminado(id)
         this.listarTrabajo()
        
       },
       error: err=>{
         this.errorMsjTrabajoEliminado()
       
   }
 })
 }
 
 
 
 msjTrabajoEliminado(id:number){
   this.snackbar.open('EL Trabajo numero Id: '+id+' se ha Eliminado', '', {
     duration: 3000,
     horizontalPosition: "center",
     verticalPosition:"top",
     panelClass: ['snackbarStylo'],
   });
 }
 
 errorMsjTrabajoEliminado(){  
 this.snackbar.open('ERROR al Eliminar Trabajo', '', {
   duration: 3000,
   horizontalPosition: "center",
   verticalPosition:"top",
   panelClass: ['snackbarStyloError'], 
   
 });
 }
 
 
 
 
 
 }
 