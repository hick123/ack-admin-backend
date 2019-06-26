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

    private localgeturl='https://ackbackend.herokuapp.com/clusters/getclusters';
    private localaddtocluster='https://ackbackend.herokuapp.com/clusters/addmemberstocluster';
    private localcreatecluster='https://ackbackend.herokuapp.com/clusters/createcluster';
    private getclusteridturl='https://ackbackend.herokuapp.com/clusters/getclusterbyid';
    private getclustermbersurl='https://ackbackend.herokuapp.com/clusters/getclustermbers';
    private unrellurl='https://ackbackend.herokuapp.com/clusters/clustersenroll';
    private getclustersurl='https://ackbackend.herokuapp.com/clusters/getclustersenrolled';

  
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
  //get cluster a member is enrolled in.
  getclustersEnrolledIn(member_id:string){
    console.log(member_id);
    const url =`${this.getclustersurl}/${member_id}`;

    // return this.http.post<any>(this.getclustersurl,{member_id}).pipe(map(memberClusters => {
    //   return memberClusters;
    // }));;
    return this.http.get(url);    
  }

    // return this.http.post(this.unrellurl,{member_id},httpOptions).pipe(tap((data: any) => console.log(data)
    // ));
}


