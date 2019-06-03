import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import {Member} from '../../shared/models/members.ts';
import { Member } from 'src/app/shared/models/members';

import{ChurchGroups} from 'src/app/shared/models/churchgroups'

import { GroupsService} from '../../shared/services';

@Component({
  selector: 'app-dash-groups',
  templateUrl: './dash-groups.component.html',
  styleUrls: ['./dash-groups.component.css']
})
export class DashGroupsComponent implements OnInit {
  groupLength;
  isLoading = false

  displayedGroups: string[] = ['group_name', 'created_date'];


  groups: MatTableDataSource<ChurchGroups>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private groupService: GroupsService) { }

  ngOnInit( ) {
    this.getGroups();
  }
  getGroups(){
    this.groupService.getChurchGroups().subscribe((data:any)=>{
      this.isLoading = false
      this.groupLength = data.length


     this.groups= new MatTableDataSource(data);
     this.groups.paginator = this.paginator;
     this.groups.sort = this.sort;
    },
    error=>       this.isLoading = false    
    );
  }
    //group filter
    groupFilter(groupValue: string) {
      this.groups.filter = groupValue.trim().toLowerCase();
  
      if (this.groups.paginator) {
        this.groups.paginator.firstPage();
      }
    }

}
