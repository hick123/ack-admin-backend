import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventDetail;
  editEventForm :FormGroup;
  isLoadingResults=false;

  minDate: Date;
  minDate1: Date;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private eventService:EventsServiceService) { }

  ngOnInit() {
    this.getEvent();
    this.form();
  }
getEvent(){
  this.eventService.getEventById(this.route.snapshot.paramMap.get('churchevents_id')).subscribe(data=>{
    console.log('selected event data',data);
    console.log(data);
    this.eventDetail=data[0];
   
    this.editEventForm.setValue({
      event_title :data[0].event_title,
      event_description : data[0].event_description,
      start_date :data[0].start_date,
      end_date :data[0].end_date,
        });

  },error=>{

    
  }
  );
}
form(){
  this.editEventForm = this.formBuilder.group({
     event_title: ['',Validators.required], 
      event_description: ['',Validators.required],
      start_date: ['',Validators.required],
      end_date: ['',Validators.required]
    });

}
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  if(this.editEventForm.value.start_date>this.editEventForm.value.end_date){
    Swal.fire('Oops...', 'End date should be greater than start date!', 'error');
          return;
  }
  // this..updateProduct(this._id, form)
  //   .subscribe(res => {
  //       let id = res['_id'];
  //       this.isLoadingResults = false;
  //       this.router.navigate(['/product-details', id]);
  //     }, (err) => {
  //       console.log(err);
  //       this.isLoadingResults = false;
  //     }
  //   );
}
  
}
