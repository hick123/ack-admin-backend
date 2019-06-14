import { Component, OnInit, ViewChild } from '@angular/core';
import { ContributionService } from 'src/app/shared/services/contribution.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Member } from 'src/app/shared/models/members';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  isLoading = true;

  displayedColumns: string[] = ['fullName','member_number', 'amount', 'description', 'date'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Member>;


  constructor(private contributionService:ContributionService) { }

  ngOnInit() {
    this.getContributions();
  }
  getContributions(){
    this.contributionService.getAllContributions().subscribe((data:any)=>{
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log('ungrouped',data);
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
