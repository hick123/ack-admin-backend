import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clusters } from '../models/clusters';
import { MemberCluster } from '../models/members_clusters';

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

  // private serverUrl = 'http://locahost:3000/signup';  // URL to web api
  // private ngrokurlcreatecluster='http://bdd8484f.ngrok.io/clusters/createcluster';
  // private ngrokurladdmemberstocluster='http://bdd8484f.ngrok.io/clusters/addmemberstocluster';
  // private ngrokurlgetclusters='http://bdd8484f.ngrok.io/clusters/getclusters';
  // private ngrokurlget='http://bdd8484f.ngrok.io/';
  // private lo=`http://locahost:3000/signup`;
  // private ngrokurlNewMembers='http://bdd8484f.ngrok.io/newmembers';

  private localgeturl='http://localhost:3000/clusters/getclusters';
    private localaddtocluster='http://localhost:3000/clusters/addmemberstocluster';
    private localcreatecluster='http://localhost:3000/clusters/createcluster';
  
  constructor(private http: HttpClient) { }
  
  getCluster(){
    return this.http.get(this.localgeturl);    

  }
  createCluster(clusters: Clusters){
    return this.http.post(this.localcreatecluster, clusters);    
  }

  addMembersToCluster(memberCluster: MemberCluster){
    return this.http.post(this.localaddtocluster, memberCluster);    
  }
}
