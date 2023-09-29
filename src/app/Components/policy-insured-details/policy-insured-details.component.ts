import { Component, OnInit } from '@angular/core';
import { InsuredDetails } from 'src/app/Model/InsuredDetails';
import { CustomerPortalService } from 'src/app/Service/customer-portal.service';

@Component({
  selector: 'app-policy-insured-details',
  templateUrl: './policy-insured-details.component.html',
  styleUrls: ['./policy-insured-details.component.scss']
})
export class PolicyInsuredDetailsComponent implements OnInit{

policyNumber:any;
chasisNumber:any;

userName:string='';

selectedPolicyNumber:any;

policy_Numbers:any[]=[];

insuredDetails:InsuredDetails={
  firstName:null,
  lastName:null,
  addressLine1:null,
  addressLine2:null,
  city:null,
  state:null,
  pincode:null,
  mobileNo:null,
  email:null,
  aadharNumber:null,
  licenseNumber:null,
  pannumber:null,
  accountNumber:null,
  ifsccode:null,
  bankName:null,
  bankAddress:null  
};

userId:string='';


  constructor(private service:CustomerPortalService){}
  ngOnInit(): void {
        this.getUserIdFromApi();
        
  }


  getUserIdFromApi(){
    this.service.getUserIdFromApi().subscribe((id) => {
      this.userId = id;
      this.fetchPolicyNumbers();
    },(error)=>{
      console.log("Error when fetching userId");
    }
    );
  }
  
  

  OnSubmit(){
    this.service.policyNumberValidate(this.policyNumber).subscribe(
      (res)=>{
        if(res){
          this.service.chasisNumberValidate(this.chasisNumber).subscribe(
            (response)=>{
              if(response){
                this.service.addUserPolicyDetails(this.userId,this.policyNumber).subscribe(
                  (result)=>{
                    if(result){
                      alert("Successfully Added");
                    }
                    else{
                      alert("Policy number Already added");
                    }
                    
                  
                    this.fetchPolicyNumbers();
                  },(error)=>{
                    console.log("Error when Adding PolicyNumber");
                  }
                );
              }
              else{
                alert("Invalid Chasis Number");
              }
            },(error)=>{
              console.log("Error  when validating chasis number");
            }
          );
        }
        else{
          alert("Invalid Policy Number");
        }
      },
      (error)=>{
          console.log("Error when validating policy numbers");
      }
    );
  }

  fetchPolicyNumbers(){
    this.service.fetchPolicyNumbers(this.userId).subscribe(
      (res)=>{
        if(res){
          this.policy_Numbers=res;
        }
        else
        {
          this.policy_Numbers=[];
        }
       
          
      },
      (error)=>{
          console.log("Error when fetching policy numbers",error);
      }
    );
  }
  fetchInsuredDetails(){
      
      this.service.fetchInsuredDetails(this.selectedPolicyNumber).subscribe(
        (res)=>{
          
          this.insuredDetails=res;
        },(error)=>{
          console.log("Error when fetching Insured Details");
        }
      );

  }
  deleteUserPolicy(){
    const confirmation=confirm('Do yo want to Delete?');
    if(confirmation){
      this.service.deleteUserPolicy(this.userId,this.selectedPolicyNumber).subscribe((res)=>{
        if(res){
          alert("Successfully Deleted");
          this.selectedPolicyNumber=null;
          this.fetchPolicyNumbers();
        }
      },(error)=>{
          console.log("Error when deleting policy numbers");
        }
    );
  }
  }
}
