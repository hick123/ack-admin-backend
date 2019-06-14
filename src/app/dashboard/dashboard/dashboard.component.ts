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
  getNewMembers(){
    this.getNewMemberssubs=   this.memberService.getNewMembers().subscribe((data:any)=>{
      this.newMembers = data;
        console.log(data);
    })
      
  }
    OnDestroy(){
        document.body.className = '';
   }
ngOnDestroy(){
  this.getMemberssubs.unsubscribe();
  this.getNewMemberssubs.unsubscribe();
  
}
}
