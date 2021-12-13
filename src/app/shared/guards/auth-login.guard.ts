import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'app/auth/services/data.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate, CanLoad {
  constructor(private dataSvc: DataService, private router: Router){}

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    // const isLogged: boolean = this.dataSvc.onCheckStorage(environment.NAME_TOKEN);
    // if (isLogged){
    //   this.router.navigate(['/main']);
    // }
    // return !isLogged;
    return true;
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const isLogged: boolean = this.dataSvc.onCheckStorage(environment.NAME_TOKEN);
    // if (isLogged){
    //   this.router.navigate(['/main']);
    // }
    // return !isLogged;
    return true;

  }

}