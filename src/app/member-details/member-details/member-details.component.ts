import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MembersService, GroupsService, ClustersService} from '../../shared/services'
import Swal from 'sweetalert2';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  editMemberForm: FormGroup;
  isLoadingResults=false;

  memberDetails;
  ministries:any[];
  groupDetails;
  clusterDetails;
  constructor(private memberService: MembersService,private groupService:GroupsService,
    private clusterService:ClustersService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

    this.getmemberbyid();
    console.log('sending ',this.route.snapshot.paramMap.get('member_id'));
    this.editForm();
    this.ministry();
    this.getUserGroups();
    this.getMemberCluster();
  }
  getmemberbyid(){
    this.isLoadingResults=true;
    this.memberService.getMember(this.route.snapshot.paramMap.get('member_id')).subscribe(data=>{
      this.isLoadingResults=false;
      console.log('selected member data',data);
      console.log(data);
      this.memberDetails=data[0];    

      console.log('first name',data[0].first_name)
      this.editMemberForm.setValue({
        first_name :data[0].first_name,
        other_names : data[0].other_names,
        marital_status :data[0].marital_status,
        occupation :data[0].occupation,
        phone : data[0].phone,
        location : data[0].location,
        age : data[0].age,
        // gender: data[0].gender

      });

    })
    }
    editForm(){
      this.editMemberForm = this.formBuilder.group({
        first_name : ['', Validators.required],
        other_names : ['', Validators.required],
        marital_status : ['', Validators.required],
        occupation : ['', Validators.required],
        phone : ['', Validators.required],
        // gender : ['', Validators.required],
        location : ['', Validators.required],
        age : ['', Validators.required]
      });
    }
    onFormSubmit(editMemberForm){
      const member_id={
        'member_id':this.route.snapshot.paramMap.get('member_id')
      }
      const editMemberForms={
        'first_name': this.editMemberForm.value.first_name,
        'other_names': this.editMemberForm.value.other_names,
        // 'password': this.editMemberForm.value.password,
        'phone': this.editMemberForm.value.phone,
        'gender': this.editMemberForm.value.gender,
        'occupation': this.editMemberForm.value.occupation,
        'location': this.editMemberForm.value.location,
        'marital_status': this.editMemberForm.value.marital_status,
        'age': this.editMemberForm.value.age,
  
      }
      const toServer={
        'member_id':member_id,
        'editForm':editMemberForms,
      } 
      console.log('submit edit member')

      this.memberService.memberEdit(toServer).subscribe(data=>{
        Swal.fire({
          type: 'success',
          title: 'Successfully edited member profile!',
          showConfirmButton: false,
          timer: 1500
        }); 
        this.getmemberbyid();
      }, error=>{
        Swal.fire({
          type: 'error',
          title: 'Could not edit member profile!',
          showConfirmButton: false,
          timer: 1500
        });         
      });
    }
    ministry(){
      this.memberService.getLoggedInMinistry(this.route.snapshot.paramMap.get('member_id')).subscribe((data:any[])=>{
        this.ministries=data;
      });
    }
    getUserGroups(){
      this.groupService.getGroupsEnrolledIn(this.route.snapshot.paramMap.get('member_id')).subscribe((data:any[])=>{
        console.log(data);
  
        this.groupDetails=data[0];
        console.log('groupdetails', this.groupDetails)
          
    });
  }
  //get cluster the member is enrolled in 
  getMemberCluster(){
    this.clusterService.getclustersEnrolledIn(this.route.snapshot.paramMap.get('member_id')).subscribe((data:any[])=>{

      console.log(data);
      this.clusterDetails=data[0];
  });
}
}
