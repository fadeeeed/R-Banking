import { Injectable } from '@angular/core';
import {HttpRequestService} from './http-request.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
constructor(private httpService:HttpRequestService){}
  login(loginStatus:boolean) { 
    if (loginStatus) {  
      sessionStorage.setItem('currentUser', "loggedin");  
      return true;  
    }  
  }  
  logout() {  
    sessionStorage.removeItem('currentUser');  
  }  
  public get loggedIn(): boolean {  
    return (sessionStorage.getItem('currentUser') !== null);  
  }  
}
