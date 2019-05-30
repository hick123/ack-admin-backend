import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators,  FormGroup, FormBuilder } from '@angular/forms';
import { GroupsService, Person} from '../../shared/services';
import { MembersService} from '../../shared/services'

import { first, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, concat, of, Subject } from 'rxjs';
import { group } from '@angular/animations';
import { Router} from '@angular/router'
import { ChurchGroups } from 'src/app/shared/models/churchgroups';
declare var $;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {


  loading = false;
 submitted = false;
 groups=[];
 members=[];
 simpleItems=[];
 groupId='8a12f5bb-72f4-11e9-8cfe-8851fbfce548';
//create group form formControl
createGroupForm :FormGroup = this.formBuilder.group({
  group_name: ['', Validators.required]
});

//formcontrol for add members to groups
addToGroupForm: FormGroup= this.formBuilder.group({
  member_id: [''],
  churchgroups_id: [''],
  is_admin:['']

});

people$: Observable<Person[]>;
people: Person[] = [];

groups$: Observable<ChurchGroups[]>;
group: ChurchGroups [] = [];

// people3Loading = false;
// groupsinput$ = new Subject<string>();


  constructor(private formBuilder: FormBuilder, private groupService: GroupsService, 
    private memberService: MembersService, private router: Router
    ) { }
    
  ngOnInit() {
    this.getGr();
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
    this.getGroups();
    console.log('groups ng on init');
    this.getMembers();
  }
   
  onSelect(g){
    this.router.navigate(['/groups',g.churchgroups_id]);
  }

  // end of ngoninit


  //fetching groups
   getGroups(){
     this.groupService.getChurchGroups().subscribe((data:any)=>{
     this.groups= data;

     console.log('groupes',this.groups);
     console.log(data);
     })
   }
   //obersavable fetch groups
   getGr(){
    this.people$ = this.groupService.getPeople();
    this.groupService.getPeople().subscribe(items => this.people = items);
    this.simpleItems = [true, 'Two', 3];  
   }
// fetching members
   getMembers(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.members=[];
      this.members=data;
      console.log('members in groups', this.members);
      console.log(data);
    })
      
  }
   
  get f() { return this.createGroupForm.controls; }

  //submiting create group form for members 
  createChurchG(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.createGroupForm.invalid) {
            return;
        }
  console.log(this.createGroupForm,'submitting form');
    this.loading = true;
    this.groupService.createChurchGroup(this.createGroupForm.value)
         .pipe(first())
         .subscribe(
             data=> {      
                },
                error => {
                    this.loading = false;
                });
    }

    // adding members to groups
    addToGroup(){
      this.submitted = true;
      console.log(this.addToGroupForm.value);
  
          // stop here if form is invalid
          // if (this.createGroupForm.invalid) {
          //     return;
          // }
    console.log(this.addToGroupForm,'submitting form for adding user');
      this.loading = true;
      this.groupService.addMembersToGroup(this.addToGroupForm.value)
           .pipe(first())
           .subscribe(
               data=> {      
                  },
                  error => {
                      this.loading = false;
                  });
                  this.addToGroupForm.reset();
      } 

}
