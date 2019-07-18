import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Clusters } from '../models/clusters';
import { MemberCluster } from '../models/members_clusters';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response'
};
// const options: IRequestOptions = {
//     headers: new HttpHeaders({"Content-Type": "application/json"}),
//     observe: "response"
// };


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
    private getclustersurl='http://localhost:3000/clusters/getclustersenrolled';

  
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
  addMembersToCluster(data:any) : Observable<HttpResponse<any>>  {
    return this.http.post<any>(this.localaddtocluster, data, {headers: new HttpHeaders({'Content-Type':'application/json'}),observe: 'response'})
    .pipe(tap(res => {
      if (res) {
                if (res.status === 201) {
                    return [{ status: res.status, json: res }]
                }
                else if (res.status === 200) {
        
                    return [{ status: res.status, json: res }]
                }
            }
      console.log('response',res);
      // const Link  = this.parse_link_header(res.headers.get('Link'));
      // this.first  = Link["first"];
      // this.last   = Link["last"];
      // this.prev   = Link["prev"];
      // this.next   = Link["next"];

    }));  
  }    
  
  
    //   .pipe(tap((res: Response) => {
  //     if (res) {
  //         if (res.status === 201) {
  //             return [{ status: res.status, json: res }]
  //         }
  //         else if (res.status === 200) {
  //             return [{ status: res.status, json: res }]
  //         }
  //     }
  // }).catch((error: any) => {
  //     if (error.status < 400 ||  error.status ===500) {
  //         return Observable.throw(new Error(error.status));
  //     }
  // })
    // return this.http.post(this.localaddtocluster, data,httpOptions);
    // .pipe(tap((res: Response) => {
    //   if (res) {
    //             if (res.status === 201) {
    //                 return [{ status: res.status, json: res }]
          

    // }
    
    // ));
    // }
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


