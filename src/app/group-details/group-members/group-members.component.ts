import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from 'src/app/shared/models/members';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/shared/services';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {
  isLoading = true;
  dataSource: MatTableDataSource<Member>;


  dataSourceLength;

  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route:ActivatedRoute,private groupService: GroupsService) { }

  ngOnInit() {
    this.getgroupmembers();
  }
  
  getgroupmembers(){
    this.groupService.getGroupMembers(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe((data:any)=>{
      console.log('group members',data);
      this.isLoading = false;

      this.dataSource =new MatTableDataSource(data);
      // this.groupMembers=data;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
