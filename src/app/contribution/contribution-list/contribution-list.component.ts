import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ContributionService } from 'src/app/shared/services/contribution.service';
import { Member } from 'src/app/shared/models/members';

@Component({
  selector: 'app-contribution-list',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.css']
})
export class ContributionListComponent implements OnInit {
  displayedColumns: string[] = ['fullName','member_number', 'amount'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading = true;

  dataSource: MatTableDataSource<Member>;


  constructor(private contributionService:ContributionService) { }

  ngOnInit() {
    this.getGroupedContributions();
  }


  getGroupedContributions(){
    this.contributionService.getAllGroupedContribution().subscribe((data:any)=>{
      // this.isLoading = false
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('grouped',data)
    },error=>{
      console.log('Could not fetch the data');
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
