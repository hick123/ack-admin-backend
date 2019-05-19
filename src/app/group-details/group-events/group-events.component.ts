import { Component, OnInit } from '@angular/core';
import { EventsServiceService,GroupsService } from 'src/app/shared/services';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css']
})
export class GroupEventsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private groupService: GroupsService ,
    private eventService:EventsServiceService) { }

  ngOnInit() {
  
  }
  listGroupEvents(){
  }

}
