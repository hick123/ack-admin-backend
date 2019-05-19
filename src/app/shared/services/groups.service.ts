import { Injectable } from '@angular/core';
import { ChurchGroups } from '../models/churchgroups';
import { MemberChurchGroups } from '../models/members_churchgroups';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    private localgeturl='http://localhost:3000/groups/getchurchgroups';
    private localgetbyidturl='http://localhost:3000/groups/getchurchbyid';
    private localaddtogroup='http://localhost:3000/groups/addtochurchgroup';
    private localcreatechurchgroup='http://localhost:3000/groups/createchurchgroups';
    private localgetgroupmembersurl='http://localhost:3000/groups/getchurchgroupmembers';

 constructor(private http: HttpClient) { }

  createChurchGroup(churchGroups: ChurchGroups) {
    return this.http.post(this.localcreatechurchgroup, churchGroups);
}
// enrolling members to churchgroups
addMembersToGroup(memberChurchGroup: MemberChurchGroups) {
  return this.http.post(this.localaddtogroup, memberChurchGroup);
}

  getChurchGroups(){
    return this.http.get(this.localgeturl);    
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

}
