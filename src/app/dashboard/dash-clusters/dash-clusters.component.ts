import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Clusters } from 'src/app/shared/models/clusters';
import { ClustersService } from 'src/app/shared/services';
@Component({
  selector: 'app-dash-clusters',
  templateUrl: './dash-clusters.component.html',
  styleUrls: ['./dash-clusters.component.css']
})
export class DashClustersComponent implements OnInit {
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clusters: MatTableDataSource<Clusters>
  displayedClusters: string[] = ['cluster_name', 'created_date'];



  constructor(private clusterService: ClustersService) { }

  ngOnInit() {
    this.getClusters();

  }
     //get clusters list
     getClusters(){
      console.log('getcluster method');
      this.clusterService.getCluster().subscribe((data:any)=>{
        this.isLoading = false    
  
        this.clusters= new MatTableDataSource(data);
        this.clusters.paginator = this.paginator;
        this.clusters.sort = this.sort;
        // this.clusters= data;
        // console.log('cluster data',data)
        // console.log('clusters',this.clusters);
        //  console.log(data);
       },    error=>       this.isLoading = false    
  
       );
    }
  
  
    //cluster filter
    clusterFilter(clusterValue: string) {
      this.clusters.filter = clusterValue.trim().toLowerCase();
  
      if (this.clusters.paginator) {
        this.clusters.paginator.firstPage();
      }
    }
}
