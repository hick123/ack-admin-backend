import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GroupsService,EventsServiceService } from 'src/app/shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  public churchGroupId;
  detailJson;
  groupDetails;
  groupMembers;
  createGroupEvents :FormGroup = this.formBuilder.group({
    event_title: ['', Validators.required],
    event_description: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required]

  });

  constructor(private route:ActivatedRoute,private groupService: GroupsService,
    private eventService:EventsServiceService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getgroupbyid();
    this.getgroupmembers();
    this.listGroupEvents();
    console.log('sending',this.route.snapshot.paramMap.get('churchgroups_id'));
    console.log('sending groupname',this.route.snapshot.paramMap.get('group_name'));

  }
  getgroupbyid(){
    this.groupService.getGroupById(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe(data=>{
      console.log('selected group data',data);
      console.log(JSON.stringify(data) );
      this.detailJson=JSON.stringify(data); 
      this.groupDetails=data;

      // this.groupDetails=JSON.parse(JSON.stringify(data));
      console.log('groupdetails', this.groupDetails);
    });
    }
    getgroupmembers(){
      this.groupService.getGroupMembers(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe(data=>{
        console.log('group members',data);
        this.groupMembers=data;
      });
    }
    listGroupEvents(){
      this.eventService.listGroupEventsById(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe(data=>{
        console.log('this particular group events',data);
      });
    }
    createGroupEvent(){
      const id = {
        'churchgroups_id': this.route.snapshot.paramMap.get('churchgroups_id')
           }
       const eventForm={

       }    
    }
  
}
