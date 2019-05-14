import { Component, OnInit } from '@angular/core';
import { MembersService} from '../../shared/services'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members=[];

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }
  getMembers(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.members=[];
      this.members=data;
      console.log(data);
    })
      
  }

}
