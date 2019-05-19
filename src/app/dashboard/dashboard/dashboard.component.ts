import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembersService} from '../../shared/services'
import { GroupsService} from '../../shared/services';
import { ClustersService } from '../../shared/services';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  members=[];
 newMembers="";
 groups=[];
 clusters=[];


  constructor(  private memberService: MembersService,
    private groupService: GroupsService, private clusterService: ClustersService) { }

  ngOnInit() {
       window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
    this.getMembers();
    this.getNewMembers();
    this.getClusters();
    this.getGroups();
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
  }
  
  getMembers(){
    this.memberService.getMembers().subscribe((data:any)=>{
      this.members=[];
      this.members=data;
      console.log(data);
    })
      
  }
  getNewMembers(){
    this.memberService.getNewMembers().subscribe((data:any)=>{
      this.newMembers = data;
        console.log(data);
    })
      
  }

  //groups
  getGroups(){
    this.groupService.getChurchGroups().subscribe((data:any)=>{
    this.groups= data;
    console.log('groupes',this.groups);
    console.log(data);
    })
  }
   //get clusters list
   getClusters(){
    console.log('getcluster method');
    this.clusterService.getCluster().subscribe((data:any)=>{
      this.clusters= data;
      console.log('cluster data',data)
      console.log('clusters',this.clusters);
       console.log(data);
     })
  }



    OnDestroy(): void {
        document.body.className = '';
}
}
