import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { environment } from '../Environments/environment';
import { Observable } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AssessmentServiceService {
  private userName:string='';

  baseApiUrl: string=environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  login(user:User):Observable<boolean>{
    console.log(user);
       return this.http.post<boolean>(this.baseApiUrl+'/api/User',user);
  }

  policyNumberValidate(policynumber:number):Observable<boolean>{
    return this.http.get<boolean>(this.baseApiUrl+'/api/User/validatePolicy/'+policynumber);
  }
  chasisNumberValidate(chasisnumber:string):Observable<boolean>{
    return this.http.get<boolean>(this.baseApiUrl+'/api/User/validateChasis/'+chasisnumber);

  }
  addUserPolicyDetails(username:string,policynumber:number){
    const data={
      username:username,
      policyNumber:policynumber
    };
    return this.http.post<any>(this.baseApiUrl+'/api/User/add',data);
  }

  fetchpolicynumbers():Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/User/policyNumber');
  }

  fetchInsuredDetails(policyNumber:number):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/User/InsuredDetails/'+policyNumber);
  }
  deleteuserpolicy(selectedPolicyNumber:number):Observable<any>{
    return this.http.delete<any>(this.baseApiUrl+'/api/User/'+selectedPolicyNumber);
  }

  setUserName(username:string){
    this.userName=username;
  }
  getUserName(){
    return this.userName;
  }
}
