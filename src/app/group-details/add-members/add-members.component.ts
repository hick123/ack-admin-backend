import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged,filter, switchMap, first, tap, catchError } from 'rxjs/operators';
import { of, Observable, concat, Subject } from 'rxjs';
import { MembersService, GroupsService } from 'src/app/shared/services';
import Swal from 'sweetalert2';
import { Member } from 'src/app/shared/models/members';


@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  @Input() public groupId;
  searchField: FormControl;
  addToGroupForm: FormGroup;

  results: any[] = [];
  results$: Observable<Member[]>;

  people3$: Observable<Member[]>;
  people3Loading = false;
  people3input$ = new Subject<string>();

   constructor(    private formBuilder: FormBuilder,private memberService: MembersService,private groupService: GroupsService
    ) { }

  ngOnInit() {
    this.searchField = new FormControl;
    this.addToGroupForm = this.formBuilder.group({ 
      search: this.searchField,
      member_id:[''],
      is_admin:[''] 
    });

    this.searchField.valueChanges.pipe(debounceTime(2000), distinctUntilChanged(),filter(term => !!term),
      switchMap(term => this.memberService.searchmembers(term)))
      .subscribe((resultValue) => {
      console.log(resultValue);
         this.results=resultValue;  
      }); 
     }

   customSearchFn(term: string, item: Member) {
    term = term.toLocaleLowerCase();
    return item.username.toLocaleLowerCase().indexOf(term) > -1 || item.gender.toLocaleLowerCase() === term;
  }

trackByFn(item: Member) {
    return item.member_id;
}
     
  addToGroup(){
    const churchgroups_id = {
      'churchgroups_id': this.groupId
         }
         const form = {
          'member_id': this.addToGroupForm.value.member_id,
          'is_admin': this.addToGroupForm.value.is_admin

             }
             const toDb={
              'churchgroups_id':churchgroups_id,
              'form':form
            } 
            console.log(toDb);
                    this.groupService.addMembersToGroup(toDb).subscribe(data=>{
                      this.addToGroupForm.reset();

 
              Swal.fire('Successfully', 'added member to the group!', 'success');

                },
                error => {
                  Swal.fire('Oops...', 'That member already belongs to a group!', 'error');
            });
  }

}
