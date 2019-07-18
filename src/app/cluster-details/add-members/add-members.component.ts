import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MembersService, GroupsService, ClustersService } from 'src/app/shared/services';
import { debounceTime, distinctUntilChanged, switchMap,filter } from 'rxjs/operators';
import Swal from 'sweetalert2';


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
                    this.clusterService.addMembersToCluster(toDb).subscribe(resp=>{
                      this.addToclusterForm.reset();
                     console.log('resp ok',resp.ok);

                    const keys = resp.headers.keys();
                      // response => console.log(response.text())

                      console.log('response http ',keys)
                


                      Swal.fire('Successfully', 'added member to the Cluster!', 'success');

                    },
                    error => {
                      this.addToclusterForm.reset();
                      console.log('error', error);
                      console.log('error message url', error.error.message);
                      if(error.status===409){
                        Swal.fire('Oops...', 'That member already belongs to a cluster!', 'error');
                      }else if(error.status===404){
                        Swal.fire('Oops...', 'We could not complete try again later!', 'error');
                      }
                });
  }
  


}
