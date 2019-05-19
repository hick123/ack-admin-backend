import { Component, OnInit } from '@angular/core';
import { ClustersService } from '../../shared/services';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css']
})
export class ClusterDetailsComponent implements OnInit {
  cluster;
  constructor(private clusterService: ClustersService, private route:ActivatedRoute) { }


  ngOnInit() {
    this.getclusterbyid();
  }
  getclusterbyid(){
    this.clusterService.getClusterById(this.route.snapshot.paramMap.get('clusters_id')).subscribe(data=>{
      console.log('selected group data',data);
      console.log(data);
      this.cluster=data;

      // this.groupDetails=JSON.parse(JSON.stringify(data));
      console.log('this cluster details', this.cluster);
    })
    }

}
