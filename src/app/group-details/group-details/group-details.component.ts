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
  submitted=false;
  public churchGroupId;
  detailJson;
  groupDetails;
  groupMembers;
  groupEvents:any=[];
  createGroupEvents :FormGroup = this.formBuilder.group({
    event_title: [''], 
    event_description: [''],
    start_date: [''],
    end_date: ['']

  });
  minDate: Date;

  minDate1: Date;

  constructor(private route:ActivatedRoute,private groupService: GroupsService,
    private eventService:EventsServiceService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    //set min date
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+1);
    //call functions
    this.getgroupbyid();
    this.getgroupmembers();
    this.listGroupEvents();
    console.log('sending',this.route.snapshot.paramMap.get('churchgroups_id'));
    console.log('sending groupname',this.route.snapshot.paramMap.get('group_name'));

  }

  createGroupEvent(){  
    this.submitted = true;
         console.log(this.createGroupEvents);
    const id = {
      'churchgroups_id': this.route.snapshot.paramMap.get('churchgroups_id')
         }
     const eventForm={
      'event_title': this.createGroupEvents.value.event_title,
      'event_description': this.createGroupEvents.value.event_description,
      'start_date': this.createGroupEvents.value.start_date,
      'end_date': this.createGroupEvents.value.end_date
     }
    const active={
      'active':1
    }
    const desc={
      'descriptor':'group'
    }
     const toServer={
       'id':id,
       'eventForm':eventForm,
       'active':active,
       'desc':desc

     }    
     console.log(JSON.stringify(toServer));
    //  console.log(JSON.parse(toServer));

     console.log(toServer);

     this.eventService.createEvent(toServer).subscribe(data=>{

     });
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
        this.groupEvents=data;
      });
    }
    
  
}
