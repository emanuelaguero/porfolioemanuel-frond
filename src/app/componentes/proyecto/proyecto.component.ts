import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoFormComponent } from 'src/app/formulario/proyecto-form/proyecto-form.component';
import { Proyecto } from 'src/app/modelo/proyecto';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];
 
  constructor(
    private dialog:MatDialog, 
  private serviceProyecto:ServiciosService,
  
  private snackbar: MatSnackBar,
  ) { }
  
  ngOnInit(): void {
    this.listarProyecto();
    
 
   }
 
   openDialogProyecto() {
     this.dialog.open(ProyectoFormComponent, {
       
         width:'30%',
     }).afterClosed().subscribe(val=>{
       if(val='save'){
         this.listarProyecto();
       }
     });
   }
 
   openEditProyecto(proyecto: any){
     this.dialog.open(ProyectoFormComponent, {
       width:'30%',
       data:proyecto,
   }).afterClosed().subscribe(val=>{
     if(val='guardar'){
       this.listarProyecto();
     }
   });
 }
 
 
   public listarProyecto(): void {
 
     this.serviceProyecto.getAllProyectos()
     .subscribe(
       data=>this.proyectos=data
       
     )}
 
 
     
 eliminarProyecto(id: number){
   this.serviceProyecto.eliminarProyecto(id)
   .subscribe(
     {
       next: data=>{
         console.log(data);
         
         this.msjProyectoEliminado(id)
         this.listarProyecto()
        
       },
       error: err=>{
         this.errorMsjProyectoEliminado()
       
   }
 })
 }
 
 
 
 msjProyectoEliminado(id:number){
   this.snackbar.open('EL Proyecto numero Id: '+id+' se ha Eliminado', '', {
     duration: 3000,
     horizontalPosition: "center",
     verticalPosition:"top",
     panelClass: ['snackbarStylo'],
   });
 }
 
 errorMsjProyectoEliminado(){  
 this.snackbar.open('ERROR al Eliminar Proyecto', '', {
   duration: 3000,
   horizontalPosition: "center",
   verticalPosition:"top",
   panelClass: ['snackbarStyloError'], 
   
 });
 }
 
 
 
 
 
 }
 