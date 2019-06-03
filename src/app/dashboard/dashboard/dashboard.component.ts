import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MembersService} from '../../shared/services'
// import { GroupsService} from '../../shared/services';
import { ClustersService } from '../../shared/services';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from 'src/app/shared/models/members';
import { Router } from '@angular/router';

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
  isLoading = true;

  dataSourceLength;

  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender','view'];


  dataSource: MatTableDataSource<Member>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 newMembers="";


  constructor(  private memberService: MembersService, private router: Router) {
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


  //subsicribe members list
  getMember(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.dataSourceLength=data.length;
      // this.members=[];
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      // this.members=data;
      // this.members=data;
      console.log(data);
    },
    error=>       this.isLoading = false    
    );
      
  }
  getNewMembers(){
    this.memberService.getNewMembers().subscribe((data:any)=>{
      this.newMembers = data;
        console.log(data);
    })
      
  }

  // //groups
  // getGroups(){
  //   this.groupService.getChurchGroups().subscribe((data:any)=>{
  //     this.isLoading = false

  //    this.groups= new MatTableDataSource(data);
  //    this.groups.paginator = this.grpaginator;
  //    this.groups.sort = this.grsort;
  //   },
  //   error=>       this.isLoading = false    
  //   );
  // }
  //  //get clusters list
  //  getClusters(){
  //   console.log('getcluster method');
  //   this.clusterService.getCluster().subscribe((data:any)=>{
  //     this.isLoading = false    

  //     this.clusters= new MatTableDataSource(data);
  //     this.clusters.paginator = this.clpaginator;
  //     this.clusters.sort = this.clsort;
  //     // this.clusters= data;
  //     // console.log('cluster data',data)
  //     // console.log('clusters',this.clusters);
  //     //  console.log(data);
  //    },    error=>       this.isLoading = false    

  //    );
  // }



    OnDestroy(){
        document.body.className = '';
}
ngOnDestroy(){



}
}
