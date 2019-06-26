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
  private localgeturl='https://ackbackend.herokuapp.com/members';
  private localsignup='https://ackbackend.herokuapp.com/members/signup';
  private localgetmemberbyid='https://ackbackend.herokuapp.com/members/getmemberbyid';

  private localnewmembers='https://ackbackend.herokuapp.com/members/newmembers';
  private member='https://ackbackend.herokuapp.com/members/newmembers';
  private activatemember='https://ackbackend.herokuapp.com/members/activatemember';
  private urlu='https://ackbackend.herokuapp.com/members/searchmember';
  private getloggedinmemberbyidministry='https://ackbackend.herokuapp.com/members/getloggedinmemberbyidministry';
  private updateprofile ='https://ackbackend.herokuapp.com/members/updateprofile'
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
