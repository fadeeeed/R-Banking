import { Injectable } from '@angular/core';
import {HttpRequestService} from './http-request.service';
import {SharingService} from '../Services/sharing.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
constructor(private httpService:HttpRequestService,
  private share:SharingService){}
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
