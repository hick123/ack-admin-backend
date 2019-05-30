import { Component, OnInit } from '@angular/core';
import { MembersService} from '../../shared/services'
import { Member } from 'src/app/shared/models/members';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];

  // members=[];

  constructor(private memberService: MembersService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getMembers();
  }

  getMembers(){
    const membersObservable = this.memberService.getMembers();
    membersObservable.subscribe((memberData: Member[])=>{
      this.members= memberData;
      console.log('memberData',memberData);
      this.spinner.hide();

    });
      
  }
  onSelect(mem){
    this.router.navigate(['/members',mem.member_id]);
  }
  getmember(){
  }

}
