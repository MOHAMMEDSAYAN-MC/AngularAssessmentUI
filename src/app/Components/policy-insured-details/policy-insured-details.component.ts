import { Component, OnInit } from '@angular/core';
import { InsuredDetails } from 'src/app/Model/InsuredDetails';
import { AssessmentServiceService } from 'src/app/Service/assessment-service.service';

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


  constructor(private service:AssessmentServiceService){}
  ngOnInit(): void {
        this.userName=this.service.getUserName();
        console.log(this.userName);
        this.fetchPolicyNumbers();
  }

  OnSubmit(){
    this.service.policyNumberValidate(this.policyNumber).subscribe(
      (res)=>{
        if(res){
          this.service.chasisNumberValidate(this.chasisNumber).subscribe(
            (response)=>{
              if(response){
                this.service.addUserPolicyDetails(this.userName,this.policyNumber).subscribe(
                  (result)=>{
                    
                    alert("Successfully Added");
                  
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
    this.service.fetchpolicynumbers().subscribe(
      (res)=>{
          this.policy_Numbers=res;
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
    this.service.deleteuserpolicy(this.selectedPolicyNumber).subscribe((res)=>{
      if(res){
        alert("Successfully Deleted");
        this.selectedPolicyNumber=null;
        this.fetchPolicyNumbers();
        console.log(res);
      }

    },(error)=>{
      console.log("Error when deleting policy numbers");
  });
  }

}
