import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../shared/services/members.service';
import { ClustersService } from '../../shared/services';
import { Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { Validators,  FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit {
  createClusterForm: FormGroup;
  addMembersToClusterForm: FormGroup;

  loading = false;
 submitted = false;
 clusters=[];
 members=[];

  constructor(private formBuilder: FormBuilder, 
    private memberService: MembersService, private router:Router,
    private clusterService: ClustersService
    ) { }

  ngOnInit() {
     //create cluster form formControl
     this.createClusterForm = this.formBuilder.group({
      cluster_name: ['', Validators.required]
    });
    
    //formcontrol for add members to groups
    this.addMembersToClusterForm = this.formBuilder.group({
      
      member_id: [''],
      clusters_id: [''],
      is_admin:['']

    });
    this.getMembers();
    this.getClusters();
  }
  //view cluster details
  onSelect(g){
    this.router.navigate(['/clusters',g.clusters_id]);
  }
  // fetching members
  getMembers(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.members=[];
      this.members=data;
      console.log('members in clusters', this.members);
      console.log(data);
    })
      
  }

  //get clusters list
  getClusters(){
    console.log('getcluster method');
    this.clusterService.getCluster().subscribe((data:any)=>{
      this.clusters= data;
      console.log('cluster data',data)
      console.log('clusters',this.clusters);
       console.log(data);
     })
  }

  //creating clusters
  createClusterm(){
    this.submitted = true;

        // stop here if form is invalid
        // if (this.createGroupForm.invalid) {
        //     return;
        // }
  console.log(this.createClusterForm,'submitting form for creating clusters');
    this.loading = true;
    this.clusterService.createCluster(this.createClusterForm.value)
         .pipe(first())
         .subscribe(
             data=> {      
                },
                error => {
                    this.loading = false;
                });
    }
    
     // adding members to cluster
     addMembersToClusters(){
      this.submitted = true;
      console.log(this.addMembersToClusterForm.value);
  
          // stop here if form is invalid
          // if (this.createGroupForm.invalid) {
          //     return;
          // }
    console.log(this.addMembersToClusterForm,'submitting form');
      this.loading = true;
      this.clusterService.addMembersToCluster(this.addMembersToClusterForm.value)
           .pipe(first())
           .subscribe(
               data=> {      
                  },
                  error => {
                      this.loading = false;
                  });
      }


}
