import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MembersService} from '../../shared/services'
import { GroupsService} from '../../shared/services';
import { ClustersService } from '../../shared/services';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import {Member} from '../../shared/models/members.ts';
import { Member } from 'src/app/shared/models/members';
import { Clusters } from 'src/app/shared/models/clusters';

import{ChurchGroups} from 'src/app/shared/models/churchgroups'
declare var $;

@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,  OnDestroy {
  private getCluster: Subscription;
  private getMembers: Subscription;
  private getChurchGroups: Subscription;
  // members:any=[];

  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender'];
  displayedGroups: string[] = ['group_name', 'created_date'];
  displayedClusters: string[] = ['cluster_name', 'created_date'];


  dataSource: MatTableDataSource<Member>;
  groups: MatTableDataSource<ChurchGroups>;
  clusters: MatTableDataSource<Clusters>


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 newMembers="";


  constructor(  private memberService: MembersService,
    private groupService: GroupsService, private clusterService: ClustersService) {
     }

  ngOnInit() {
    
    this.getMember();
       window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
    this.getNewMembers();
    this.getClusters();
    this.getGroups();
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
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //group filter
  groupFilter(groupValue: string) {
    this.groups.filter = groupValue.trim().toLowerCase();

    if (this.groups.paginator) {
      this.groups.paginator.firstPage();
    }
  }
    //cluster filter
    clusterFilter(clusterValue: string) {
      this.clusters.filter = clusterValue.trim().toLowerCase();
  
      if (this.clusters.paginator) {
        this.clusters.paginator.firstPage();
      }
    }
  //subsicribe members list
  getMember(){
    this.memberService.getMembers().subscribe((data:any)=>{
      // this.members=[];
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      // this.members=data;
      // this.members=data;
      console.log(data);
    })
      
  }
  getNewMembers(){
    this.memberService.getNewMembers().subscribe((data:any)=>{
      this.newMembers = data;
        console.log(data);
    })
      
  }

  //groups
  getGroups(){
    this.groupService.getChurchGroups().subscribe((data:any)=>{
     this.groups= new MatTableDataSource(data);
     this.groups.paginator = this.paginator;
     this.groups.sort = this.sort;
    })
  }
   //get clusters list
   getClusters(){
    console.log('getcluster method');
    this.clusterService.getCluster().subscribe((data:any)=>{
      this.clusters= new MatTableDataSource(data);
      this.clusters.paginator = this.paginator;
      this.clusters.sort = this.sort;
      // this.clusters= data;
      // console.log('cluster data',data)
      // console.log('clusters',this.clusters);
      //  console.log(data);
     })
  }



    OnDestroy(){
        document.body.className = '';
}
ngOnDestroy(){



}
}
