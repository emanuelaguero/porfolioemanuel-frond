import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  URL = "http://localhost:8080/aut";
currentUserSubject:BehaviorSubject <any>
  constructor(private http:HttpClient) { 
    console.log("servicio iniciado");
    this.currentUserSubject=new BehaviorSubject <any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
  }

















iniciarSesion(credenciales:any):Observable<any>
{

  return this.http.post(this.URL,credenciales).pipe(map(data=>{
    sessionStorage.setItem('currentUser',JSON.stringify(data));

      return data;
  
  }))

}





}