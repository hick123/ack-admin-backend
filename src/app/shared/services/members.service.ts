import { Injectable } from '@angular/core';
import {Member} from '../models/members';
import { Observable,Subject } from 'rxjs';
import { map,tap, delay } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private localgeturl='http://localhost:3000/members';
  private localsignup='http://localhost:3000/members/signup';
  private localgetmemberbyid='http://localhost:3000/members/getmemberbyid';

  private localnewmembers='http://localhost:3000/members/newmembers';
  private member='http://localhost:3000/members/newmembers';
  private activatemember='http://localhost:3000/members/activatemember';
  private urlu='http://localhost:3000/members/searchmember';
  private getloggedinmemberbyidministry='http://localhost:3000/members/getloggedinmemberbyidministry';
  private updateprofile ='http://localhost:3000/members/updateprofile'
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }
  register(member: Member) {
    return this.http.post(this.localsignup, member);
}

getLoggedInMinistry(member_id:string){
  console.log(member_id);
  return this.http.post<any>(this.getloggedinmemberbyidministry,{member_id}).pipe(map(memberDetails => {
    return memberDetails;
  }))
}

memberEdit(data:any){
  console.log('sending edit details to server...',data);
    return this.http.post(this.updateprofile, data,httpOptions).pipe(tap((data: any) => console.log(data)
    ));
    
}
  getMembers(){
    return this.http.get(this.localgeturl);    
  }
  searchmembers(term: string){
    const url =`${this.urlu}/${term}`;
      return this.http.get<any[]>(url).pipe(tap());
  }
  getNewMembers(){
    return this.http.get(this.localnewmembers);    
  }
  getMember(member_id: String){
    const url =`${this.localgetmemberbyid}/${member_id}`

    return this.http.get(url);    
  }
  activate(member_id:string,member_number:string){
    return this.http.post<any>(this.activatemember, { member_id, member_number })   
         .pipe(map(data =>{
          
        }));
  }
}
