import { Injectable } from '@angular/core';
import { ChurchGroups } from '../models/churchgroups';
import { MemberChurchGroups } from '../models/members_churchgroups';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    private localgeturl='https://ackbackend.herokuapp.com/groups/getchurchgroups';
    private localgetbyidturl='https://ackbackend.herokuapp.com/groups/getchurchbyid';
    private localaddtogroup='https://ackbackend.herokuapp.com/groups/addtochurchgroup';
    private localcreatechurchgroup='https://ackbackend.herokuapp.com/groups/createchurchgroups';
    private localgetgroupmembersurl='https://ackbackend.herokuapp.com/groups/getchurchgroupmembers';
    private unrellurl ='https://ackbackend.herokuapp.com/groups/unenrolledfromgroup';

    private getgroupsurl='https://ackbackend.herokuapp.com/groups/getgroupsenrolled';


 constructor(private http: HttpClient) { }

  createChurchGroup(churchGroups: ChurchGroups) {
    return this.http.post(this.localcreatechurchgroup, churchGroups);
}
// enrolling members to churchgroups
addMembersToGroup(data:any) {
  return this.http.post(this.localaddtogroup, data,httpOptions).pipe(tap((data: any) => console.log(data)
  ));
}

  getChurchGroups(){
    return this.http.get<any[]>(this.localgeturl);    
  }
 
  getGroupById(churchgroups_id: String){
    const url =`${this.localgetbyidturl}/${churchgroups_id}`;
    console.log('get group byid sending url........',url)
    return this.http.get(url);    
  }
  getGroupMembers(churchgroups_id: String){
    const url =`${this.localgetgroupmembersurl}/${churchgroups_id}`;

    return this.http.get(url);    
  }
  unenrollmemberfromgroup(member_id: String){
    const url =`${this.unrellurl}/${member_id}`;

    return this.http.get(url)
}
//get individual group

getGroupsEnrolledIn(member_id: String){
  console.log('event service sending ',member_id);
  const url =`${this.getgroupsurl}/${member_id}`;
  console.log('url............',url);
  return  this.http.get(url);    
}

}
