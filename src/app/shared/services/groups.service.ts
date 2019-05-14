import { Injectable } from '@angular/core';
import { ChurchGroups } from '../models/churchgroups';
import { MemberChurchGroups } from '../models/members_churchgroups';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  // private serverUrl = 'http://locahost:3000/signup';  // URL to local api
  // private ngrokurlcreate='http://bdd8484f.ngrok.io/groups/createchurchgroups';
  // private ngrokurlAddGroup='http://bdd8484f.ngrok.io/groups/addtochurchgroup';
  // private ngrokurlgetGroups='http://bdd8484f.ngrok.io/groups/getchurchgroups';

    private localgeturl='http://localhost:3000/groups/getchurchgroups';
    private localaddtogroup='http://localhost:3000/groups/addchurchgroups';
    private localcreatechurchgroup='http://localhost:3000/groups/createchurchgroups';

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

}
