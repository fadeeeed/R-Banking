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
}
