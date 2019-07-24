import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  ViewEncapsulation
} from "@angular/core";
import { MembersService, GroupsService } from "../../shared/services";
// import { GroupsService} from '../../shared/services';
import { ClustersService } from "../../shared/services";
import { Subscription, Observable } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Member } from "src/app/shared/models/members";
import { Router } from "@angular/router";
import { ContributionService } from "src/app/shared/services/contribution.service";
import { Contributions } from "src/app/shared/models/contribution";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from "ng2-charts";
import { ChartOptions, ChartType } from "chart.js";
// import * as _ from 'lodash';
import * as d3 from "d3";

declare var $;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild("chart") private chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  chartDataD3: Array<any>;

  isLoading = true;
  inAct;
  act;

  activated: any = [];
  private getMemberssubs: Subscription;
  private getNewMemberssubs: Subscription;

  phone;
  dataSourceLength;

  displayedColumns: string[] = [
    "username",
    "first_name",
    "other_names",
    "member_number",
    "phone",
    "occupation",
    "gender",
    "view"
  ];

  dataSource: MatTableDataSource<Member>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  members: Member[];

  cols: any[];

  newMembers = "";
  total_clusters;
  total_groups;
  total_group_contribution;
  total_cluster_contribution;
  total_church_contribution;
  non_member_contributions;
  totalChurchContribution: Observable<Contributions>;

  total_group_contribution_chart;
  total_cluster_contribution_chart;
  total_church_contribution_chart;
  total_clusters_chart;

  //ag-grid
  columnDefs = [
    {
      headerName: "Member number",
      field: "member_number",
      sortable: true,
      filter: true
    },
    { headerName: "Username", field: "username", sortable: true, filter: true },
    {
      headerName: "First name",
      field: "first_name",
      sortable: true,
      filter: true
    },
    {
      headerName: "Last name",
      field: "Last_name",
      sortable: true,
      filter: true
    },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true }
  ];
  defaultColDef = { resizable: true };
  rowData: any;

  //charts
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = ["Cluster", "Groups", "Non-members"];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  chartData = [];

  constructor(
    private memberService: MembersService,
    private router: Router,
    private contributionService: ContributionService,
    private clusterService: ClustersService,
    private groupService: GroupsService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.getMember();
    window.dispatchEvent(new Event("resize"));
    document.body.className = "hold-transition skin-blue sidebar-mini";
    this.getNewMembers();
    // this.getClusters();
    $(function() {
      $("#example1").DataTable();
      $("#example2").DataTable({
        paging: true,
        lengthChange: true,
        searching: false,
        ordering: false,
        info: true,
        autoWidth: false
      });
    });
    this.contributionWithGroup();
    this.contributionWithClusters();
    this.totalContribution();
    this.getClusters();
    this.getGroups();
    this.chartF();
    if (this.chartDataD3) {
      this.updateChart();
    }
    this.generateData();
  }
  chartF() {
    console.log("chart called ");
    let contributionWithGroupchart = this.contributionWithGroup();
    console.log("chart called next", contributionWithGroupchart);

    let contributionWithClustersChart = this.contributionWithClusters();
    console.log("chart called next", contributionWithClustersChart);

    let totalclucster = this.getClusters();
    console.log("chart called next", totalclucster);

    console.log("contributionWithGroupchart", contributionWithGroupchart);
    this.totalContribution();
    this.getClusters();
    this.chartData.push(
      contributionWithGroupchart,
      contributionWithClustersChart,
      totalclucster
    );
    console.log(
      "total_group_contribution chart",
      this.total_group_contribution
    );
    console.log("chart", this.chartData);
    this.chartData = this.pieChartData;
    // this.PieChartData.push(this.total_cluster_contribution);
    // this.PieChartData.push(this.total_cluster_contribution);
  }
  generateData() {
    this.chartData = [];
    for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
      this.chartData.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3
      .select(element)
      .append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight);

    // chart plot area
    this.chart = svg
      .append("g")
      .attr("class", "bars")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.chartDataD3.map(d => d[0]);
    let yDomain = [0, d3.max(this.chartDataD3, d => d[1])];

    // create scales
    this.xScale = d3
      .scaleBand()
      .padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // bar colors
    this.colors = d3
      .scaleLinear()
      .domain([0, this.chartDataD3.length])
      .range(<any[]>["red", "blue"]);

    // x & y axis
    this.xAxis = svg
      .append("g")
      .attr("class", "axis axis-x")
      .attr(
        "transform",
        `translate(${this.margin.left}, ${this.margin.top + this.height})`
      )
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg
      .append("g")
      .attr("class", "axis axis-y")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }
  updateChart() {
    // update scales & axis
    this.xScale.domain(this.chartDataD3.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.chartDataD3, d => d[1])]);
    this.colors.domain([0, this.chartDataD3.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll(".bar").data(this.chartDataD3);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart
      .selectAll(".bar")
      .transition()
      .attr("x", d => this.xScale(d[0]))
      .attr("y", d => this.yScale(d[1]))
      .attr("width", d => this.xScale.bandwidth())
      .attr("height", d => this.height - this.yScale(d[1]))
      .style("fill", (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => this.xScale(d[0]))
      .attr("y", d => this.yScale(0))
      .attr("width", this.xScale.bandwidth())
      .attr("height", 0)
      .style("fill", (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr("y", d => this.yScale(d[1]))
      .attr("height", d => this.height - this.yScale(d[1]));
  }
  viewdetails(row) {
    this.router.navigate(["/members", row.member_id]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //subscribe active members list
  getMember() {
    const activated = [];
    const inActive = [];
    this.getMemberssubs = this.memberService.getMembers().subscribe(
      (data: any) => {
        this.dataSourceLength = data.length;
        this.isLoading = false;
        let totalActive = 0;
        let totalInActive = 0;

        var arrayLength = data.length;
        for (var i = 0; i < arrayLength; i++) {
          if (data[i].member_number !== null) {
            totalActive++;
            activated.push(data[i]);
            console.log("row data", this.rowData);
            this.rowData = activated;
            this.members = activated;
            this.dataSource = new MatTableDataSource(activated);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else if (data[i].member_number === null) {
            totalInActive++;
          }
        }
        this.act = totalActive;
        this.inAct = totalInActive;
        console.log(totalInActive);
        console.log(totalActive);
      },
      error => (this.isLoading = false)
    );
    this.cols = [
      { field: "username", header: "username" },
      { field: "member_number", header: "member_number" },
      { field: "first_name", header: "first_name" },
      { field: "last_name", header: "last_name" }
    ];
  }
  //total church contributions
  totalContribution() {
    this.contributionService
      .getAllContributions()
      .toPromise()
      .then((data: any[]) => {
        let sum = 0;
        var arrayLength = data.length;
        for (let i = 0; i < arrayLength; i++) {
          sum += data[i].amount;
        }
        this.total_church_contribution = sum;
        console.log(
          "Total church contributions",
          this.total_church_contribution
        );
      });
  }
  //sums group contributions
  contributionWithGroup(): any {
    console.log("church groups");
    this.contributionService.contributionWithGroups().subscribe((data: any) => {
      console.log(data);
      let sum = 0;
      var arrayLength = data.length;
      for (var i = 0; i < arrayLength; i++) {
        sum += data[i].amount;
      }
      this.total_group_contribution = sum;
      this.total_group_contribution_chart = sum;

      console.log("sum total_group_contribution", sum);
      this.chartData.push(this.total_group_contribution);
      console.log("chart", this.chartData);
      return sum;
    });
    // let sum=increment;
    console.log(
      "output closure",
      this.contributionService.contributionWithGroups
    );
  }
  //sums cluster contributions
  //:Number
  contributionWithClusters() {
    console.log("cluster");

    this.contributionService
      .contributionWithClusters()
      .subscribe((data: any[]) => {
        console.log(data);
        let sum = 0;
        var arrayLength = data.length;
        for (var i = 0; i < arrayLength; i++) {
          sum += data[i].amount;
        }
        this.total_cluster_contribution = sum;
        this.total_cluster_contribution_chart = sum;
        this.chartData.push(this.total_cluster_contribution);

        console.log("sum total_cluster_contribution", sum);
      });
    // return sum;
  }

  getNewMembers() {
    this.getNewMemberssubs = this.memberService
      .getNewMembers()
      .subscribe((data: any) => {
        this.newMembers = data;
        console.log(data);
      });
  }
  //get groups total number
  getClusters() {
    console.log("getcluster method");
    this.clusterService
      .getCluster()
      .toPromise()
      .then((data: any[]) => {
        let sum = 0;
        let arrayLength = data.length;
        for (let i = 0; i < arrayLength; i++) {
          sum++;
        }
        this.total_clusters = sum;
        this.total_clusters_chart = sum;
        this.total_clusters_chart = sum;
        this.chartData.push(this.total_clusters_chart);
      });

    // return sum;
  }

  //get groups total number
  getGroups() {
    this.groupService
      .getChurchGroups()
      .toPromise()
      .then(
        (data: any[]) => {
          let sum = 0;
          let arrayLength = data.length;
          for (let i = 0; i < arrayLength; i++) {
            sum++;
          }
          this.total_groups = sum;
          console.log("total_groups", this.total_groups);
        },
        error => (this.isLoading = false)
      );
  }
  OnDestroy() {
    document.body.className = "";
  }
  ngOnDestroy() {
    this.getMemberssubs.unsubscribe();
    this.getNewMemberssubs.unsubscribe();
  }
}
