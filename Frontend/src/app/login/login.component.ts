import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpRequestService } from '../Services/http-request.service';
import { AuthenticationService } from '../Services/authentication.service';
import { environment } from 'src/environments/environment';
import {SharingService} from '../Services/sharing.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model: any = {};
  
  errorMessage: string;
  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private httpService: HttpRequestService,
    private share:SharingService
  ) {
    if (this._auth.loggedIn) {
      //this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  inputUserName: any;
  inputPassword: any;
  UserNameValue(event: any) {
    this.inputUserName = (<HTMLInputElement>event.target).value;
    this.share.setData(this.inputUserName);
  }
  passwordValue(event: any) {
    this.inputPassword = (<HTMLInputElement>event.target).value;
  }
  url: any;
  login() {
   this.url=environment.localurl+'/RBanking/login';
   let data={
    "email":this.inputUserName,
    "password":this.inputPassword
   };
   if (this.inputUserName != null && this.inputPassword != null) {
    this.httpService
      .posthttpRequest(this.url, data)
      .subscribe((responseData: any) => {
        console.log(responseData);
        if(responseData==1){
          this.router.navigate(['/userDetails']);
        }
        else {
          Swal.fire(
            'Invalid Credentials !',
            'Please Check your Username and Password',
            'error'
          );
        }
      });
  } else {
    Swal.fire(
      'Invalid Credentials !',
      'Please Check your Username and Password',
      'error'
    );
  }
  }

  Home() {
   
  }
  forgotPassword() {

  }
}