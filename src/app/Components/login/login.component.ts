import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { CustomerPortalService } from 'src/app/Service/customer-portal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  user:User={
    userName:'',
    passWord:''
  };

  constructor(private service:CustomerPortalService,private router:Router){}
  ngOnInit(): void {
    
  }

  Login(){
    this.service.login(this.user).subscribe((res)=>{
      if(res){

        localStorage.setItem('token',Math.random().toString());
        this.router.navigate(['/PolicyInsuredDetails']);
        this.service.setUserName(this.user.userName);
        
      }
      else{
        alert("Invalid Credentials.Please try again.");
      }
    },(error)=>{
      console.log("Error occurs when user try to Login");
    }
    );

  }
}
