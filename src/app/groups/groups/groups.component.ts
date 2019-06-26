import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Validators,  FormGroup, FormBuilder } from '@angular/forms';
import { GroupsService} from '../../shared/services';
import { MembersService} from '../../shared/services'

import { first, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, concat, of, Subject } from 'rxjs';
import { group } from '@angular/animations';
import { Router} from '@angular/router'
import { ChurchGroups } from 'src/app/shared/models/churchgroups';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
declare var $;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  displayedGroups: string[] = ['group_name', 'created_date','view'];
  groups: MatTableDataSource<ChurchGroups>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  loading = false;
 submitted = false;
 groupss=[];
 members=[];
 simpleItems=[];
 groupId='8a12f5bb-72f4-11e9-8cfe-8851fbfce548';
//create group form formControl
createGroupForm :FormGroup = this.formBuilder.group({
  group_name: ['', Validators.required]
});

  constructor(private formBuilder: FormBuilder, private groupService: GroupsService, 
    private memberService: MembersService, private router: Router
    ) { }
    
  ngOnInit() {
    this.getGroups();
    this.getMembers()
    // this.getGr();
        //iCheck for checkbox and radio inputs
 $(() => {
  window.dispatchEvent(new Event('resize'));
  document.body.className = 'hold-transition skin-blue sidebar-mini';
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass   : 'iradio_minimal-blue'
    });
  });

     //Red color scheme for iCheck
  $(() => {
     $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass   : 'iradio_minimal-red'
    });
  });

    //Flat red color scheme for iCheck
 $(() => {
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })
  });
    //call function to fetch groups
    console.log('groups ng on init');
    this.getMembers();
  }
   
   //group filter
   groupFilter(groupValue: string) {
    this.groups.filter = groupValue.trim().toLowerCase();

    if (this.groups.paginator) {
      this.groups.paginator.firstPage();
    }
  }

  onSelect(row){
    this.router.navigate(['/groups',row.churchgroups_id]);
  }

   getGroups(){
     this.groupService.getChurchGroups().subscribe((data:any)=>{
      // this.members=[];
      this.groupss=data;

     this.groups= new MatTableDataSource(data);
     this.groups.paginator = this.paginator;
     this.groups.sort = this.sort;
     })
   }
   getMembers(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.members=data;
      console.log('members in groups', this.members);
      console.log(data);
    })
      
  }
   
  get f() { return this.createGroupForm.controls; }

  createChurchG(){
    this.submitted = true;

        if (this.createGroupForm.invalid) {
            return;
        }
  console.log(this.createGroupForm,'submitting form');
    this.loading = true;
    this.groupService.createChurchGroup(this.createGroupForm.value)
         .pipe(first())
         .subscribe(
             data=> { 
              this.loading = false;
     
              Swal.fire('Successfull', 'Created the group!', 'success');

                },
                error => {
                  Swal.fire('Oops...', 'could not create then group!', 'error');

                });
    }
  }
