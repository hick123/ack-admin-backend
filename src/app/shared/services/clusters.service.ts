import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clusters } from '../models/clusters';
import { MemberCluster } from '../models/members_clusters';

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

    private localgeturl='http://localhost:3000/clusters/getclusters';
    private localaddtocluster='http://localhost:3000/clusters/addmemberstocluster';
    private localcreatecluster='http://localhost:3000/clusters/createcluster';
    private getclusteridturl='http://localhost:3000/clusters/getclusterbyid';

  
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
  getClusterById(clusters_id: String){
    const url =`${this.getclusteridturl}/${clusters_id}`;

    return this.http.get(url);    
  }
}
