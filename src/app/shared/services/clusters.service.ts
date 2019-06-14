import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clusters } from '../models/clusters';
import { MemberCluster } from '../models/members_clusters';
import { tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

    private localgeturl='http://localhost:3000/clusters/getclusters';
    private localaddtocluster='http://localhost:3000/clusters/addmemberstocluster';
    private localcreatecluster='http://localhost:3000/clusters/createcluster';
    private getclusteridturl='http://localhost:3000/clusters/getclusterbyid';
    private getclustermbersurl='http://localhost:3000/clusters/getclustermbers';
    private unrellurl='http://localhost:3000/clusters/clustersenroll';

  
  constructor(private http: HttpClient) { }
  
  getCluster(){
    return this.http.get(this.localgeturl);    

  }
  getclusterMembers(clusters_id: String){
    const url =`${this.getclustermbersurl}/${clusters_id}`;

    return this.http.get(url);    
  }

  createCluster(clusters: Clusters){
    return this.http.post(this.localcreatecluster, clusters);    
  }

  // addMembersToCluster(memberCluster: MemberCluster){
  //   return this.http.post(this.localaddtocluster, memberCluster);    
  // }
  addMembersToCluster(data:any) {
    return this.http.post(this.localaddtocluster, data,httpOptions).pipe(tap((data: any) => console.log(data)
    ));
  }
  getClusterById(clusters_id: String){
    const url =`${this.getclusteridturl}/${clusters_id}`;

    return this.http.get(url);    
  }
  unenrollmemberfromcluster(member_id: String){
        const url =`${this.unrellurl}/${member_id}`;
  
      return this.http.get(url);
  }

    // return this.http.post(this.unrellurl,{member_id},httpOptions).pipe(tap((data: any) => console.log(data)
    // ));
}


