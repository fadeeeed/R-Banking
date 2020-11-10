import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../Services/http-request.service';
import { environment } from 'src/environments/environment';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { env } from 'process';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  show=true;
  constructor(private http:HttpRequestService,
    private fb: FormBuilder,
    private router:Router) { }
    id:any;
    acc_no:any;
    Name:any;
    Email:any;
    Contact:any;
    Balance:any;
    buttonName:string="Add Amount";
    get registerFormControl() {
      return this.registerForm.controls;
    }
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        customerId:['',Validators.required],
        amount:['',Validators.required]
      }
    );

    

    let url = environment.localurl + '/RBanking/getDetails?customerId=1604583511004';
    this.http.gethttpResponse(url,null).subscribe((responseData:any)=>{
      this.id=responseData[0].customerId;
      this.acc_no=responseData[0].accountNumber;
      this.Name=responseData[0].name;
      this.Email=responseData[0].email;
      this.Contact=responseData[0].contactNumber;
      this.Balance=responseData[0].balance;
      console.log(responseData);
    });
  }
  inputAmount:number;
  UserNameValue(event: any) {
    this.inputAmount = +(<HTMLInputElement>event.target).value;
    console.log(this.inputAmount);
  }
  onSubmit(){
    if(this.show){
      let url=environment.localurl+'/RBanking/addBalance'
      let data={
        "customerId":1604583511004,
        "balance":this.inputAmount
      }
      this.http.posthttpRequest(url,data).subscribe((resonse:any)=>{
        console.log(resonse);
      })
      this.ngOnInit();
      this.inputAmount=null;
    }
    else{
      let url=environment.localurl+'/RBanking/withdraw';
      let data={
      "customerId":1604583511004,
      "balance":this.inputAmount
    }
    this.http.posthttpRequest(url,data).subscribe((response:any)=>{
      console.log(response);
    })
    this.ngOnInit();
    this.inputAmount=null;
    }
    
    
  }
  signout(){
    this.router.navigate(['/login']);
  }
  addClick(){
    this.show=true;
    this.buttonName="Add Amount";
  }
  withdrawClick(){
    this.show=false;
    this.buttonName="Withdraw Amount";
  }
}
