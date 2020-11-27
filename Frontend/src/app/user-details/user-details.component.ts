import { Component, OnInit ,Input} from '@angular/core';
import { HttpRequestService } from '../Services/http-request.service';
import { environment } from 'src/environments/environment';
import {SharingService} from '../Services/sharing.service';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  //customerId:any=sessionStorage.setItem('customer_id',this.share.getData());
  registerForm: FormGroup;
  submitted = false;
  show=true;
  constructor(private http:HttpRequestService,
    private fb: FormBuilder,
    private router:Router,
    private share:SharingService
    ) { }
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

    
    

    let url = environment.localurl + '/RBanking/getDetails?customerId='.concat(sessionStorage.getItem('customer_id'));
    console.log(url);
    this.http.gethttpResponse(url,null).subscribe((responseData:any)=>{
      this.id=responseData[0].customerId;
      this.acc_no=responseData[0].accountNumber;
      this.Name=responseData[0].name;
      this.Email=responseData[0].email;
      this.Contact=responseData[0].contactNumber;
      this.Balance=responseData[0].balance;
    });
  }
  inputAmount:number;
  UserNameValue(event: any) {
    this.inputAmount = +(<HTMLInputElement>event.target).value;
    console.log(this.inputAmount);
  }
  onSubmit(){}
  signout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  addClick(){
    let url=environment.localurl+'/RBanking/addBalance'
      let data={
        "customerId":sessionStorage.getItem("customer_id"),
        "balance":this.inputAmount
      }
      this.http.posthttpRequest(url,data).subscribe((resonse:any)=>{
        console.log(resonse);
        this.ngOnInit();
      })
      
      this.inputAmount=null;
    }
  withdrawClick(){
    let url=environment.localurl+'/RBanking/withdraw';
    let data={
    "customerId":sessionStorage.getItem("customer_id"),
    "balance":this.inputAmount
  }
  this.http.posthttpRequest(url,data).subscribe((response:any)=>{
    if(response[0].responseCode==200){
      Swal.fire('Success','Withdrawal Successful','success');
    }
    else if(response[0].responseCode==401){
      Swal.fire('Insufficient Balance','','info');
    }
    console.log(response);
    this.ngOnInit();
  })
  
  this.inputAmount=null;
  }
}
