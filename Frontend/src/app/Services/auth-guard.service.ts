import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
@Injectable({ providedIn: 'root' })  

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _router: Router) { }  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
        if (sessionStorage.getItem('currentUser')) {  
            return true;  
        }  
        this._router.navigate(['']);  
        return false;  
    }  
}