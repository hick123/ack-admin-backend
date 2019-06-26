import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MembersService, GroupsService} from '../../shared/services'
// import { GroupsService} from '../../shared/services';
import { ClustersService } from '../../shared/services';
import { Subscription, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from 'src/app/shared/models/members';
import { Router } from '@angular/router';
import { ContributionService } from 'src/app/shared/services/contribution.service';
import { Contributions } from 'src/app/shared/models/contribution';
// import * as _ from 'lodash';


declare var $;

@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,  OnDestroy {
  isLoading = true;
  inAct;
  act;


  activated:any=[];
  private getMemberssubs: Subscription;
  private getNewMemberssubs:Subscription;

  phone;
  dataSourceLength;

  displayedColumns: string[] = ['username', 'first_name', 'other_names','member_number', 'phone', 'occupation','gender','view'];


  dataSource: MatTableDataSource<Member>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 newMembers="";
 total_clusters;
 total_groups;
 total_group_contribution;
 total_cluster_contribution;
 total_church_contribution;
 non_member_contributions;
 totalChurchContribution: Observable<Contributions>;

  constructor(  private memberService: MembersService, private router: Router,
    private contributionService:ContributionService,private clusterService: ClustersService,
    private groupService: GroupsService) {
     }

  ngOnInit() {
    
    this.getMember();
       window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
    this.getNewMembers();
    // this.getClusters();
    $(function () {
      $("#example1").DataTable();
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": false,
        "ordering": false,
        "info": true,
        "autoWidth": false
      });
    });
    this.contributionWithGroup();
    this.contributionWithClusters();
    this.totalContribution();
    this.getClusters();
    this.getGroups();    
  }
  viewdetails(row){
    this.router.navigate(['/members',row.member_id]);

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //subscribe members list
  getMember(){
      const activated=[];
      const inActive=[];
      this.getMemberssubs=      this.memberService.getMembers().subscribe((data:any)=>{
      this.dataSourceLength=data.length;
      this.isLoading = false
      let totalActive = 0;
      let totalInActive = 0;

      var arrayLength = data.length;
      for (var i = 0; i < arrayLength; i++) {
        if( data[i].member_number !== null){
               totalActive++;
              activated.push(data[i]);
              this.dataSource = new MatTableDataSource(activated);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
       }else if(data[i].member_number===null){
        totalInActive++;           
       }

      }
      this.act=totalActive;
      this.inAct=totalInActive;
      console.log(totalInActive);
      console.log(totalActive);
    },
    error=> this.isLoading = false    
    );
      
  }
  //total church contributions
  totalContribution(){
     this.contributionService.getAllContributions().toPromise().then((data:any[])=>{
      let sum=0;
      var arrayLength=data.length;
      for (let i=0;i <arrayLength; i++){
        sum+=data[i].amount;        
      }
            this.total_church_contribution=sum;
            console.log('Total church contributions',this.total_church_contribution);
    });
  }
  //sums group contributions
contributionWithGroup(){
  console.log('church groups');

  this.contributionService.contributionWithGroups().subscribe((data:any)=>{
    console.log(data);
    let sum=0;
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
             sum+=data[i].amount;
    }
    this.total_group_contribution=sum;
    console.log('sum total_group_contribution',sum);
  });
}
//sums cluster contributions
contributionWithClusters(){
  console.log('cluster');

  this.contributionService.contributionWithClusters().subscribe((data:any[])=>{
    console.log(data);
    let sum=0;
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
             sum+=data[i].amount;
    }
    this.total_cluster_contribution=sum;
    console.log('sum total_cluster_contribution',sum);
  });
}

  getNewMembers(){
    this.getNewMemberssubs=   this.memberService.getNewMembers().subscribe((data:any)=>{
      this.newMembers = data;
        console.log(data);
    })
      
  }
         //get groups total number
    getClusters(){
      console.log('getcluster method');
      this.clusterService.getCluster().toPromise().then((data:any[])=>{
        let sum=0;
        let arrayLength=data.length;
        for(let i=0;i<arrayLength;i++){
          sum++;
        }
        this.total_clusters=sum;
      });
    }
         //get groups total number
    getGroups(){
      this.groupService.getChurchGroups().toPromise().then((data:any[])=>{
        let sum=0;
        let arrayLength=data.length;
        for(let i=0;i<arrayLength;i++){
          sum++;
        }
        this.total_groups=sum;  
        console.log('total_groups',this.total_groups) 
      },
      error=> this.isLoading = false    
      );
    }
    OnDestroy(){
        document.body.className = '';
   }
ngOnDestroy(){
  this.getMemberssubs.unsubscribe();
  this.getNewMemberssubs.unsubscribe();
  
}
}
