import { Component, OnInit,ViewChild } from '@angular/core';
import { MembersService} from '../../shared/services'
import { Member } from 'src/app/shared/models/members';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender'];
  dataSource: MatTableDataSource<Member>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // members: Member[] = [];

  // members=[];

  constructor(private memberService: MembersService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getMembers();
  }

  getMembers(){
    const membersObservable = this.memberService.getMembers();
    membersObservable.subscribe((memberData: Member[])=>{
      this.dataSource = new MatTableDataSource(memberData);

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      // this.members= memberData;
      // console.log('memberData',memberData);
      // this.spinner.hide();

    });
      
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSelect(mem){
    this.router.navigate(['/members',mem.member_id]);
  }
  getmember(){
  }

}
