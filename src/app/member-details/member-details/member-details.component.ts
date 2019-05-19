import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MembersService} from '../../shared/services'


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberDetail;

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getmemberbyid();
    console.log('sending ',this.route.snapshot.paramMap.get('member_id'));
  }
  getmemberbyid(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('member_id')).subscribe(data=>{
      console.log('selected member data',data);
      console.log(data);
      this.memberDetail=data;

      // this.groupDetails=JSON.parse(JSON.stringify(data));
      console.log('Member details', this.memberDetail);
    })
    }

}
