import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MembersService} from '../../shared/services'

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  editMemberForm: FormGroup;

  memberDetail;

  constructor(private memberService: MembersService,private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getmemberbyid();
    console.log('sending ',this.route.snapshot.paramMap.get('member_id'));
    this.editForm();
  }
  getmemberbyid(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('member_id')).subscribe(data=>{
      console.log('selected member data',data);
      console.log(data);
      this.memberDetail=data;
      console.log('first name',data[0].first_name)
      this.editMemberForm = this.formBuilder.group({
        'first_name' :data[0].first_name,
        'other_names' : data[0].other_names,
        'marital_status' :data[0].marital_status,
        'occupation' :data[0].occupation,
        'phone' : data[0].phone,
        'location' : data[0].location,
        'age' : data[0].age
      });

    })
    }
    editForm(){
      this.editMemberForm = this.formBuilder.group({
        'first_name' : ['', Validators.required],
        'other_names' : ['', Validators.required],
        'marital_status' : ['', Validators.required],
        'occupation' : ['', Validators.required],
        'phone' : ['', Validators.required],
        'location' : ['', Validators.required],
        'age' : ['', Validators.required]
      });
    }
  }
