import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/members';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const httpOptions = {
//   headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentMemberSubject: BehaviorSubject<Member>;
  public currentMember: Observable<Member>;
  authToken: any;
  user: any;
  private localsignin='http://localhost:3000/auth/login';
  private localsignup='http://localhost:3000/auth/signup';
  private checkemailurl='http://localhost:3000/auth/checkemail';


  helper = new JwtHelperService();
  decodeToken:any;
  memberSignedIn:any;
  memberSignedParse:any;
 
  constructor(private http:HttpClient) { 
    this.currentMemberSubject = new BehaviorSubject<Member>(JSON.parse(localStorage.getItem('currentMember')));
    this.currentMember= this.currentMemberSubject.asObservable();
  }
  public get currentMemberValue(): Member {
    return this.currentMemberSubject.value;
}

  login(username: string, password: string) {
    return this.http.post<any>(this.localsignin, { username, password })
        .pipe(map(member => {
            // login successful if there's a jwt token in the response
            if (member && member.token) {
                localStorage.setItem('currentMember', JSON.stringify(member));
                console.log('undecoded token',JSON.stringify(member));
                this.decodeToken=this.helper.decodeToken(JSON.stringify(member));
                
          
                console.log('decoded token',this.decodeToken.data[0].member_id);
            }

            return member;
        }));
}

register(data:any){
  console.log('sending registation details to server...',data);
    return this.http.post(this.localsignup, data,httpOptions).pipe(tap((data: any) => console.log(data)
    ));

}
getToken() {
  return localStorage.getItem('currentMember')
}

loggedIn() {
  console.log(localStorage.getItem('currentMember'));
  return !!localStorage.getItem('currentMember')    
}
logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentMember');
    this.currentMemberSubject.next(null);
}
validateUsername(username:string){
  const url =`${this.checkemailurl}/${username}`

  return this.http.get(url);
}
}
