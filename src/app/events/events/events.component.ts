import { Component, OnInit ,ViewChild, OnDestroy} from '@angular/core';
import { EventsServiceService } from 'src/app/shared/services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Events } from 'src/app/shared/models/events';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit,OnDestroy{
  private listAllEventsSubs: Subscription;

  displayedColumns: string[] = ['event_name',  'event_description','start_date', 'end_date', 'view_details'];

  dataSourceLength;

  isLoading=true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Events>;

  Events:any=[];
  
  constructor(private eventService:EventsServiceService, private router: Router) { }

  ngOnInit() {
    $(function () {
      $("#example1").DataTable();
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": false,
        "ordering": false,
        "info": true,
        "autoWidth": false
      });
    });
    this.getEvents();
  }
 getEvents(){
   this.listAllEventsSubs=
   this.eventService.listAllEvents().subscribe((data:any)=>{
     console.log('eventss',data);
     this.isLoading=false;
     this.dataSource=new MatTableDataSource(data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   })


 }
 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
viewDetails(row){
  this.router.navigate(['/events',row.churchevents_id]);
  

}
ngOnDestroy(){
 this.listAllEventsSubs.unsubscribe();
}

}
