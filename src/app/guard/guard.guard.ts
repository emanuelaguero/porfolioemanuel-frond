import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from '../servicios/servicios.service';

@Injectable({
  providedIn: 'root'
})

export class GuardGuard implements CanActivate {
  constructor(
    private service: ServiciosService,
    ){}
    public login:boolean

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.service.logen){
        alert("no tiene permiso")
      }
    return true;
    //return this.service.logen;
  }
  


}
