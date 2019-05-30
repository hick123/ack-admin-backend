import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from 'src/app/shared/services';


declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  Events:any=[];
  constructor(private eventService:EventsServiceService) { }

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
   this.eventService.listAllEvents().subscribe(data=>{
     console.log('eventss',data);
     this.Events=data;

   })

 }
}
