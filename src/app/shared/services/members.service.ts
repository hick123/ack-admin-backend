import { Injectable } from '@angular/core';
import {Member} from '../models/members';
import { Observable,Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // private serverUrl = 'http://locahost:3000/signup';  // URL to web api
  // private ngrokurl='http://bdd8484f.ngrok.io/signup';
  // private ngrokurlget='http://bdd8484f.ngrok.io/';
  // private lo=`http://locahost:3000/signup`;
  // private ngrokurlNewMembers='http://bdd8484f.ngrok.io/newmembers';
  private localgeturl='http://localhost:3000';
  private localsignup='http://localhost:3000/signup';
  private localnewmembers='http://localhost:3000/newmembers';
  private member='http://localhost:3000/newmembers';
  private subject = new Subject<any>();



  constructor(private http: HttpClient) { }
  register(member: Member) {
    return this.http.post(this.localsignup, member);
}

  getMembers(){
    return this.http.get(this.localgeturl);    
  }
  getNewMembers(){
    return this.http.get(this.localnewmembers);    
  }
  getMember(member_id: String){
    const url =`${this.localgeturl}/${member_id}`

    return this.http.get(url);    
  }
// register(member: Member): Observable<any> {
//   return this.http.post<Member>(this.serverUrl, member, httpOptions).pipe(map((res: any) => {
//     console.log('post actvitymood',member);
//   }))
// }
}
