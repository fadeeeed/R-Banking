import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpRequestService } from '../Services/http-request.service';
import { AuthenticationService } from '../Services/authentication.service';
import { environment } from 'src/environments/environment';
import {SharingService} from '../Services/sharing.service';
import { CustomvalidationService } from '../Services/customvalidation.service';
import Swal from 'sweetalert2';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model: any = {};
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string;
  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private httpService: HttpRequestService,
    private share:SharingService,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
  ) {
    if (this._auth.loggedIn) {
      this.router.navigate(['/userDetails']);
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        contact:['',Validators.required],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  inputUserName: any;
  inputPassword: any;
  UserNameValue(event: any) {
    this.inputUserName = (<HTMLInputElement>event.target).value;
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
        if(responseData[0].responseCode==200){
          this._auth.login(true);
          sessionStorage.setItem('customer_id',responseData[0].customerId);
          this.share.setData(responseData[0].customerId);
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
  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.valid) {
      let data = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        contact: this.registerForm.value.contact.toString(),
        password: this.registerForm.value.password,
      };
      let url = environment.localurl + '/RBanking/createAccount';
      this.httpService.posthttpRequest(url, data).subscribe((response: any) => {
        console.log(response);
      });
    }
  };
  Home() {
   
  }
  forgotPassword() {

  }
}