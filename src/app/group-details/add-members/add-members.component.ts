import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged,filter, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { MembersService, GroupsService } from 'src/app/shared/services';
import Swal from 'sweetalert2';


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
        var membersResults = JSON.parse(JSON.stringify(resultValue));
        // var memberObj = {};

  
      }); 
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

            }, error=>{

            });
  }

}
