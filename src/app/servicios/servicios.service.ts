import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../modelo/educacion';
import { Habilidad } from '../modelo/habilidad';
import { Persona } from '../modelo/persona';
import { Proyecto } from '../modelo/proyecto';
import { Trabajo } from '../modelo/trabajo';

import  firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';


firebase.initializeApp(environment.firebaseConfig);
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public logen:boolean
  storareRef=firebase.app().storage().ref();
  constructor(private httpClient:HttpClient, private httpClientEducacion:HttpClient,private httpClientHabilidad:HttpClient,private httpClientProyecto:HttpClient, private httpClientTrabajo:HttpClient) { }

  URL = "http://localhost:3306";

  public getAllPersonas(): Observable<Persona[]> {
    this.logen=true
    return this.httpClient.get<Persona[]>(this.URL+"/lista");
  }
  postPersona(persona: Persona){
    return this.httpClient.post <any> (this.URL+"/crear/persona",persona)
  }

  getPersona(){
    return this.httpClient.get <any> (this.URL+"/listarPersonas")
  }



  putPersona(persona:Persona, id: number):Observable<any>{ 
    return this.httpClient.put<any>(this.URL + "/actualizar/persona/"+id,persona);
  }

  eliminarPersona(id:number){
    return this.httpClient.delete<any>(this.URL+"/eliminar/persona/"+id);
  }


//--------------------------Educacion-------------------------------

public getAllEducacion(): Observable<Educacion[]> {
  return this.httpClientEducacion.get<Educacion[]>(this.URL+"/listar");
}

postEducacion(educacion: Educacion){
  return this.httpClientEducacion.post <any> (this.URL+"/crear/educacion",educacion)
}

getEducacion(){
  return this.httpClientEducacion.get <any> (this.URL+"/listareducacion")
}



putEducacion(educacion:Educacion, id: number):Observable<any>{ 
  return this.httpClientEducacion.put<any>(this.URL + "/actualizar/educacion/"+id,educacion);
}

eliminarEducacion(id:number){
  return this.httpClientEducacion.delete<any>(this.URL+"/eliminar/educacion/"+id);
}


//--------------------------Trabajo-------------------------------




public getAllTrabajos(): Observable<Trabajo[]> {
  return this.httpClientTrabajo.get<Trabajo[]>(this.URL+"/listartrabajo");
}

postTrabajo(trabajo: Trabajo){
  return this.httpClientTrabajo.post <any> (this.URL+"/crear/trabajo",trabajo)
}

getTrabajo(){
  return this.httpClientTrabajo.get <any> (this.URL+"/listartrabajo")
}



putTrabajo(trabajo:Trabajo, id: number):Observable<any>{ 
  return this.httpClientTrabajo.put<any>(this.URL + "/actualizar/trabajo/"+id,trabajo);
}

eliminarTrabajo(id:number){
  return this.httpClientTrabajo.delete<any>(this.URL+"/eliminar/trabajo/"+id);
}






//--------------------------Habilidad-------------------------------

public getAllHabilidad(): Observable<Habilidad[]> {
  return this.httpClientHabilidad.get<Habilidad[]>(this.URL+"/listarhabilidad");
}

postHabilidad(habilidad: Habilidad){
  return this.httpClientHabilidad.post <any> (this.URL+"/crear/habilidad",habilidad)
}

getHabilidad(){
  return this.httpClientHabilidad.get <any> (this.URL+"/listarhabilidad")
}



putHabilidad(habilidad:Habilidad, id: number):Observable<any>{ 
  return this.httpClientHabilidad.put<any>(this.URL + "/actualizar/habilidad/"+id,habilidad);
}

eliminarHabilidad(id:number){
  return this.httpClientHabilidad.delete<any>(this.URL+"/eliminar/habilidad/"+id);
}


//--------------------------Proyecto-------------------------------




public getAllProyectos(): Observable<Proyecto[]> {
  return this.httpClientProyecto.get<Proyecto[]>(this.URL+"/listarproyecto");
}



postProyecto(proyecto: Proyecto){
  return this.httpClientProyecto.post <any> (this.URL+"/crear/proyecto",proyecto)
}

getProyecto(){
  return this.httpClientProyecto.get <any> (this.URL+"/listarproyecto")
}



putProyecto(proyecto:Proyecto, id: number):Observable<any>{ 
  return this.httpClientProyecto.put<any>(this.URL + "/actualizar/proyecto/"+id,proyecto);
}

eliminarProyecto(id:number){
  return this.httpClientProyecto.delete<any>(this.URL+"/eliminar/proyecto/"+id);
}






}


