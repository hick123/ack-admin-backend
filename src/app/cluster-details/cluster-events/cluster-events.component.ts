import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsServiceService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Events } from 'src/app/shared/models/events';

@Component({
  selector: 'app-cluster-events',
  templateUrl: './cluster-events.component.html',
  styleUrls: ['./cluster-events.component.css']
})
export class ClusterEventsComponent implements OnInit {
  dataSource: MatTableDataSource<Events>;

  displayedColumns: string[] = ['event_name',  'event_description','start_date', 'end_date'];
  dataSourceLength;
  isLoading=true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor( private eventService:EventsServiceService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.listClusterEvents();
  }
  listClusterEvents(){
    this.eventService.listClusterEventsById(this.route.snapshot.paramMap.get('clusters_id')).subscribe((data:any)=>{
      console.log('this particular cluster events',data);
      this.isLoading=false;

      this.dataSource= data;
    });
  }


}
