import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MembersService } from "../../shared/services/members.service";
import { ClustersService } from "../../shared/services";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ChurchGroups } from "src/app/shared/models/churchgroups";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-clusters",
  templateUrl: "./clusters.component.html",
  styleUrls: ["./clusters.component.css"]
})
export class ClustersComponent implements OnInit, OnDestroy {
  // private getMembersubs: Subscription;
  // private addMembersToClusterSubs: Subscription;
  // private createClusterSubs: Subscription;
  // private getClusterSubs: Subscription;

  displayedGroups: string[] = ["group_name", "created_date", "view"];
  clusters: MatTableDataSource<ChurchGroups>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clusterss;

  loading = false;
  createClusterForm: FormGroup;
  addMembersToClusterForm: FormGroup;

  submitted = false;
  //  clusters=[];
  members = [];

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MembersService,
    private router: Router,
    private clusterService: ClustersService
  ) {}

  ngOnInit() {
    //create cluster form formControl
    this.createClusterForm = this.formBuilder.group({
      cluster_name: ["", Validators.required]
    });

    //formcontrol for add members to groups
    this.addMembersToClusterForm = this.formBuilder.group({
      member_id: [""],
      clusters_id: [""],
      is_admin: [""]
    });
    this.getClusters();
  }
  //view cluster details
  onSelect(row) {
    this.router.navigate(["/clusters", row.clusters_id]);
  }
  // // fetching members
  // getMembers(){
  //   this.getMembersubs=
  //   this.memberService.getMembers().subscribe((data:any)=>{
  //     this.members=[];
  //     this.members=data;
  //     console.log('members in clusters', this.members);
  //     console.log(data);
  //   })

  // }

  //get clusters list
  getClusters() {
    console.log("getcluster method");
    // this.getClusterSubs=
    this.clusterService.getCluster().subscribe((data: any) => {
      this.clusterss = data;

      this.clusters = new MatTableDataSource(data);
      this.clusters.paginator = this.paginator;
      this.clusters.sort = this.sort;
    });
  }
  //cluster filter
  clusterFilter(groupValue: string) {
    this.clusters.filter = groupValue.trim().toLowerCase();

    if (this.clusters.paginator) {
      this.clusters.paginator.firstPage();
    }
  }

  //creating clusters
  createClusterm() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.createGroupForm.invalid) {
    //     return;
    // }
    console.log(
      this.createClusterForm,
      "submitting form for creating clusters"
    );
    this.loading = true;
    // this.createClusterSubs=
    this.clusterService
      .createCluster(this.createClusterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          Swal.fire("Successfull", "Created the cluster!", "success");
        },
        error => {
          Swal.fire(
            "Oops...",
            "could not create then cluster already exists!",
            "success"
          );

          this.loading = false;
        }
      );
  }

  // adding members to cluster
  addMembersToClusters() {
    this.submitted = true;
    console.log(this.addMembersToClusterForm.value);

    console.log(this.addMembersToClusterForm, "submitting form");
    this.loading = true;
    // this.addMembersToClusterSubs=
    this.clusterService
      .addMembersToCluster(this.addMembersToClusterForm.value)
      .pipe(first())
      .subscribe(
        data => {},
        error => {
          this.loading = false;
        }
      );
  }
  remove(cluster_id) {}
  ngOnDestroy() {
    //  this.addMembersToClusterSubs.unsubscribe();
    //  this.createClusterSubs.unsubscribe();
    //  this.getClusterSubs.unsubscribe();
  }
}
