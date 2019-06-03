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

  // members: Member[] = [];

  // members=[];

  constructor(private memberService: MembersService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getMembers();
  }
  activateMember(member_id:string){
        Swal.fire({
          title: 'Submit your Github username',
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
              Swal.insertQueueStep({
                type: 'success',
                title: 'You have successfully activated the member'
              })           
            },error => {
              Swal.insertQueueStep({
                type: 'error',
                title: 'Error occured during activation'
              })      
              })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }
  getMembers(){
    const membersObservable = this.memberService.getMembers();
    membersObservable.subscribe((memberData: Member[])=>{
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(memberData);

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      // this.members= memberData;
      // console.log('memberData',memberData);
      // this.spinner.hide();

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
  getmember(){
  }
  // deleteStaff(staffId: number) {
  //   swal({
  //        type:'warning',
  //        title: 'Are you sure to Delete Staff?',
  //        text: 'You will not be able to recover the data of Staff',
  //        showCancelButton: true,
  //        confirmButtonColor: '#049F0C',
  //        cancelButtonColor:'#ff0000',
  //        confirmButtonText: 'Yes, delete it!',
  //        cancelButtonText: 'No, keep it'
  //      }).then(() => {
  //      this.dataService.deleteStaff(staffId).subscribe(
  //        data => {
  //          if (data.hasOwnProperty('error')) {
  //            this.alertService.error(data.error);
  //          } else if (data.status) {
  //            swal({
  //              type:'success',
  //              title: 'Deleted!',
  //              text: 'The Staff has been deleted.',              
  //            })
  //          }
  //        }, error => {
  //          this.alertService.error(error);
  //        });
  //      }, (dismiss) => {
  //        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
  //        if (dismiss === 'cancel') {
  //          swal({
  //            type:'info',
  //            title: 'Cancelled',
  //            text: 'Your Staff file is safe :)'
  //          })
  //        }
  //      });
  //  }

}
