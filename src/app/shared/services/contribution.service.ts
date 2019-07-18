import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  private addurl ='http://localhost:3000/contribution/addcontribution';
  private getAll ='http://localhost:3000/contribution/allContributions';
  private getGroup ='http://localhost:3000/contribution/groupcontributions';
  private contributionWithGroupsurl ='http://localhost:3000/contribution/contributionWithGroups';
  private contributionWithclustersurl ='http://localhost:3000/contribution/contributionwithclusters';
   

  constructor(private http: HttpClient) { }
  
  addContribution(data:any ){
    console.log('data event...',data);
    return this.http.post(this.addurl, data).pipe(tap((data: any) => console.log(data)
    ));
  }
  getAllContributions(){
    return this.http.get(this.getAll);    
  }
  getAllGroupedContribution(){
    return this.http.get(this.getGroup);    
  }
      //get groups members with respective contribution
      contributionWithGroups(){
        return this.http.get(this.contributionWithGroupsurl);    
    
      }
      //get cluster members with respective contribution
      contributionWithClusters(){
        return this.http.get(this.contributionWithclustersurl);    
    
      }
}
