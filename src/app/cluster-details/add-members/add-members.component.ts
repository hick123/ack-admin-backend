import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MembersService, GroupsService, ClustersService } from 'src/app/shared/services';
import { debounceTime, distinctUntilChanged, switchMap,filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  @Input() clusterId;
  searchField: FormControl;
  addToclusterForm: FormGroup;

  results: any[] = [];

  constructor(private formBuilder: FormBuilder,private memberService: MembersService,    private clusterService: ClustersService
    ) { }

  ngOnInit() {
    this.searchField = new FormControl;
    this.addToclusterForm = this.formBuilder.group({ 
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
     
  addToCluster(){
    const clusters_id = {
      'clusters_id': this.clusterId
         }
         const form = {
          'member_id': this.addToclusterForm.value.member_id,
          'is_admin': this.addToclusterForm.value.is_admin

             }
             const toDb={
              'clusters_id':clusters_id,
              'form':form
            } 
            console.log(toDb);
                    this.clusterService.addMembersToCluster(toDb).subscribe(data=>{

            });
  }


}
