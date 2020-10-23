import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Application } from '@applications/application.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '@applications/application.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss'],
})
export class ApplicationsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'devices', 'latest-update', 'menu'];
  dataSource = new MatTableDataSource<Application>();
  @Input() applications: Application[];
  application: Application;
  resultsLength = 0;
  @Input() isLoadingResults: boolean;
  public pageLimit = 10;


  @Input() pageTotal: number;
  @Input() pageOffset: number;
  @Output() prevPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Output() deleteApplication = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    translate.use('da');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges")
    if (this.applications) {
      this.dataSource = new MatTableDataSource(this.applications);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.resultsLength = this.applications.length;
    }
  }

  clickDelete(element: any) {
    this.deleteApplication.emit(element.id);
  }

  navigateToEditPage() {
    this.router.navigate(['edit-application', this.application.id]);
  }

  onViewDetails(id) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
