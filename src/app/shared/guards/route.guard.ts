import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { DataService } from 'app/auth/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanLoad {

  constructor(private dataSvc: DataService, private router: Router){}

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const isAllowed: boolean = this.dataSvc.isAllowed(route.path);
    // if(!isAllowed){
    //   this.router.navigate(['/main']);
    // }

    // return isAllowed;
    return true;
  }
}
