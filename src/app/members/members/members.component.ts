import { Component, OnInit,ViewChild } from '@angular/core';
import { MembersService} from '../../shared/services'
import { Member } from 'src/app/shared/models/members';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender','activate'];
  dataSource: MatTableDataSource<Member>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = true;
  member_number;

    constructor(private memberService: MembersService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getMembers();
  }
  activateMember(member_id:string){
        Swal.fire({
          title: 'Please enter member number to activate',
          input: 'text',
          type:'question',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Activate',
          showLoaderOnConfirm: true,
          preConfirm: (member_number) => {
            return this.memberService.activate(member_id,member_number).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'You have succefully activated!',
                showConfirmButton: false,
                timer: 2500
              });           
            },error => {
              Swal.fire({
                type: 'error',
                title: 'That member number is taken'
              })      
              })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }
  getMembers(){
    const inActive=[];
    const membersObservable = this.memberService.getMembers();
    membersObservable.subscribe((memberData: any)=>{
      this.isLoading = false;
      var arrayLength = memberData.length;
      for (var i = 0; i < arrayLength; i++) {
        if( memberData[i].member_number === null){
          inActive.push(memberData[i]);
              this.dataSource = new MatTableDataSource(inActive);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
      }
      }
    }, 
    error=>       this.isLoading = false    
    );
    
      
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
}
