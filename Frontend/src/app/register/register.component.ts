import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../Services/http-request.service';
import { CustomvalidationService } from '../Services/customvalidation.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private httpService: HttpRequestService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: [
          '',
          [Validators.required],
          this.customValidator.userNameValidator.bind(this.customValidator),
        ],
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

  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.valid) {
      let data = {
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        userName: this.registerForm.value.username,
        password: this.registerForm.value.password,
        userRole: 'U',
        userLoginStatus: 'A',
      };
      let url = environment.localurl + '/loginservices/signup';
      this.httpService.posthttpRequest(url, data).subscribe((response: any) => {
        this.spinner.hide();
        if (response.responseBody.includes('Success')) {
          this.router.navigate(['/open']);
        } else {
          Swal.fire('', response.responseBody, 'error');
        }
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
  }
}