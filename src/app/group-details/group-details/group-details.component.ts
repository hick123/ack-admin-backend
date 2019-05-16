import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GroupsService } from 'src/app/shared/services';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  public churchGroupId;

  groupDetails;
  groupMembers;

  constructor(private route:ActivatedRoute,private groupService: GroupsService) { }

  ngOnInit() {

    // let churchgroup_id = this.route.snapshot.paramMap.get('churchgroups_id');
    // console.log(churchgroup_id);
    // this.churchGroupId = churchgroup_id;
    this.getgroupbyid();
    this.getgroupmembers();
  }
  getgroupbyid(){
    this.groupService.getGroupById(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe(data=>{
      console.log('selected group data',data);
      console.log(data);
      this.groupDetails=data;

      // this.groupDetails=JSON.parse(JSON.stringify(data));
      console.log('groupdetails', this.groupDetails);
    })
    }
    getgroupmembers(){
      this.groupService.getGroupMembers(this.route.snapshot.paramMap.get('group_name')).subscribe(data=>{
        console.log('group members',data);
        this.groupMembers=data;
      })
    }
}
