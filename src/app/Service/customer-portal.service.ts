import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/user';
import { InsuredDetails } from '../Model/InsuredDetails';

@Injectable({
  providedIn: 'root'
})
export class CustomerPortalService {

  private userName:string='';

  baseApiUrl: string=environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  login(user:User):Observable<boolean>{

       return this.http.post<boolean>(this.baseApiUrl,user);
  }

  policyNumberValidate(policynumber:number):Observable<boolean>{
    return this.http.get<boolean>(this.baseApiUrl+'/validatePolicy/'+policynumber);
  }
  chasisNumberValidate(chasisnumber:string):Observable<boolean>{
    return this.http.get<boolean>(this.baseApiUrl+'/validateChasis/'+chasisnumber);

  }
  addUserPolicyDetails(userId:string,policynumber:number){
    const data={
      userId:userId,
      policyNumber:policynumber
    };
  
    return this.http.post<boolean>(this.baseApiUrl+'/add',data);
  }

  fetchPolicyNumbers(userid:string):Observable<number[]>{
    return this.http.get<number[]>(this.baseApiUrl+'/policyNumber/'+userid);
  }

  fetchInsuredDetails(policyNumber:number):Observable<InsuredDetails>{
    return this.http.get<InsuredDetails>(this.baseApiUrl+'/InsuredDetails/'+policyNumber);
  }
  deleteUserPolicy(userId:string,selectedPolicyNumber:number):Observable<boolean>{
    const data={
      userid:userId,
      policyNumber:selectedPolicyNumber
    };
    return this.http.delete<boolean>(this.baseApiUrl, { body: data });
  }

  setUserName(username:string){
    this.userName=username;
  }

  getUserIdFromApi():Observable<string>{
    return this.http.get<string>(this.baseApiUrl+'/'+this.userName);
  }
}