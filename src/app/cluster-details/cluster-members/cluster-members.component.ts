import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Member } from 'src/app/shared/models/members';
import { ActivatedRoute } from '@angular/router';
import { GroupsService, ClustersService } from 'src/app/shared/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cluster-members',
  templateUrl: './cluster-members.component.html',
  styleUrls: ['./cluster-members.component.css']
})
export class ClusterMembersComponent implements OnInit {
  isLoading = true;
  dataSource: MatTableDataSource<Member>;


  dataSourceLength;

  displayedColumns: string[] = ['username', 'first_name', 'other_names', 'phone', 'occupation','gender','remove'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route:ActivatedRoute,private clusterService: ClustersService) { }
  ngOnInit() {
    this.getclustermembers();
  }
  getclustermembers(){
    this.clusterService.getclusterMembers(this.route.snapshot.paramMap.get('clusters_id')).subscribe((data:any)=>{
      console.log('cluster members',data);
      this.isLoading=false;
      this.dataSource=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  remove(member_id : string){
    this.clusterService.unenrollmemberfromcluster(member_id).subscribe(data=>{
      Swal.fire('Oops...', 'Unenroll member from the group!', 'success');


    },error=>{
      Swal.fire('Oops...', 'Could not unenroll member from the group!', 'error');
    }
    )
  }

}
