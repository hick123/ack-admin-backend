import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsServiceService,GroupsService } from 'src/app/shared/services';
import { ActivatedRoute} from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Events } from 'src/app/shared/models/events';



@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css']
})
export class GroupEventsComponent implements OnInit {
  displayedColumns: string[] = ['event_name',  'event_description','start_date', 'end_date'];
  dataSourceLength;
  isLoading=true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  dataSource: MatTableDataSource<Events>;


  constructor(private route:ActivatedRoute,private groupService: GroupsService ,
    private eventService:EventsServiceService) { }

  ngOnInit() {
    this.listGroupEvents(); 
  
  }
  listGroupEvents(){
    this.eventService.listGroupEventsById(this.route.snapshot.paramMap.get('churchgroups_id')).subscribe((data:any)=>{
      console.log('this particular group events',data);
      this.isLoading=false;
      this.dataSource=new MatTableDataSource(data);
      
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
