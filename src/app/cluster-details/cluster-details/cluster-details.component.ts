import { Component, OnInit } from '@angular/core';
import { ClustersService, EventsServiceService } from '../../shared/services';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css']
})
export class ClusterDetailsComponent implements OnInit {
  clusterDetails;
  clusterMembers;
  clusterEvents;
  isLoading=true;

  public clusterID =this.route.snapshot.paramMap.get('clusters_id')

  submitted=false;
  createClusterEvents :FormGroup = this.formBuilder.group({
    event_title: [''], 
    event_description: [''],
    start_date: [''],
    end_date: ['']

  });
  minDate: Date;

  minDate1: Date;
  constructor(private clusterService: ClustersService, private route:ActivatedRoute,
    private eventService:EventsServiceService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getclusterbyid();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+1);
  }
  createClusterEvent(){  
    this.submitted = true;
         console.log(this.createClusterEvents);
    const id = {
      'clusters_id': this.route.snapshot.paramMap.get('clusters_id')
         }
     const eventForm={
      'event_title': this.createClusterEvents.value.event_title,
      'event_description': this.createClusterEvents.value.event_description,
      'start_date': this.createClusterEvents.value.start_date,
      'end_date': this.createClusterEvents.value.end_date
     }
    const active={
      'active':1
    }
    const desc={
      'descriptor':'cluster'
    }
     const toServer={
       'id':id,
       'eventForm':eventForm,
       'active':active,
       'desc':desc

     }    
     console.log(JSON.stringify(toServer));
    //  console.log(JSON.parse(toServer));

     console.log(toServer);

     this.eventService.createClusterEvent(toServer).subscribe(data=>{

     });
  }

  getclusterbyid(){
    this.clusterService.getClusterById(this.route.snapshot.paramMap.get('clusters_id')).subscribe(data=>{
      this.clusterDetails=data;

      // this.groupDetails=JSON.parse(JSON.stringify(data));
      console.log('this cluster details', this.clusterDetails);
    })
    }
   
  

}
