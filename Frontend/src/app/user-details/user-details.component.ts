import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../Services/http-request.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private http:HttpRequestService) { }
    id:any;
    acc_no:any;
    Name:any;
    Email:any;
    Contact:any;
    Balance:any;

  ngOnInit(): void {
    

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

}
