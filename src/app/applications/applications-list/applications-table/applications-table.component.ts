import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { Application, ApplicationData } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { ControlledProperty } from "@shared/models/controlled-property.model";
import { ApplicationDeviceTypeEntries } from "@shared/enums/device-type";
import { ApplicationDeviceType } from "@applications/models/application-device-type.model";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { TableColumn } from "@shared/types/table.type";
import { MatDialog } from "@angular/material/dialog";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
import { ApplicationChangeOrganizationDialogComponent } from "@applications/application-change-organization-dialog/application-change-organization-dialog.component";

const columnDefinitions: TableColumn[] = [
  {
    id: "name",
    display: "APPLICATION-TABLE.NAME",
    default: true,
    toggleable: false,
  },
  {
    id: "owner",
    display: "APPLICATION-TABLE.OWNER",
    default: true,
    toggleable: true,
  },
  {
    id: "contactPerson",
    display: "APPLICATION-TABLE.CONTACT-PERSON",
    default: false,
    toggleable: true,
  },
  {
    id: "devices",
    display: "APPLICATION-TABLE.IOT-DEVICES",
    default: true,
    toggleable: true,
  },
  {
    id: "dataTargets",
    display: "APPLICATION-TABLE.DATA-TARGETS",
    default: true,
    toggleable: true,
  },
  {
    id: "openDataDkEnabled",
    display: "APPLICATION-TABLE.OPEN-DATA-DK",
    default: false,
    toggleable: true,
  },
  {
    id: "status",
    display: "APPLICATION-TABLE.STATUS",
    default: true,
    toggleable: true,
  },
  {
    id: "personalData",
    display: "APPLICATION-TABLE.PERSONAL-DATA",
    default: true,
    toggleable: true,
  },
  {
    id: "startDate",
    display: "APPLICATION-TABLE.START-DATE",
    default: false,
    toggleable: true,
  },
  {
    id: "endDate",
    display: "APPLICATION-TABLE.END-DATE",
    default: false,
    toggleable: true,
  },
  {
    id: "category",
    display: "APPLICATION-TABLE.CATEGORY",
    default: false,
    toggleable: true,
  },
  {
    id: "controlledProperties",
    display: "APPLICATION-TABLE.CONTROLLED-PROPERTIES",
    default: false,
    toggleable: true,
  },
  {
    id: "deviceTypes",
    display: "APPLICATION-TABLE.DEVICE-TYPES",
    default: false,
    toggleable: true,
  },
  {
    id: "menu",
    display: "",
    default: true,
    toggleable: false,
  },
];

@Component({
  selector: "app-applications-table",
  styleUrls: ["./applications-table.component.scss"],
  templateUrl: "./applications-table.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsTableComponent implements AfterViewInit, OnInit {
  @Input() organizationId: number;
  @Input() permissionId: number;

  faFlagIcon = faFlag;

  displayedColumns: string[] = [];

  data: Application[] = [];

  public pageSize = environment.tablePageSize;
  pageSizeOptions = DefaultPageSizeOptions;
  resultsLength = 0;
  isLoadingResults = true;
  public errorMessage: string;

  applicationSavedColumns = "applicationSavedColumns";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private applicationService: ApplicationService,
    private router: Router,
    private deleteDialogService: DeleteDialogService,
    private cdRef: ChangeDetectorRef,
    private changeOrganizationDialog: MatDialog
  ) {}

  ngOnInit() {
    // Detect changes done by child column selector
    this.cdRef.detectChanges();
    this.translate.use("da");
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getApplications(this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  getApplications(orderByColumn: string, orderByDirection: string): Observable<ApplicationData> {
    return this.applicationService
      .getApplications(
        this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize,
        orderByDirection,
        orderByColumn,
        this.organizationId,
        this.permissionId
      )
      .pipe(
        map((data: ApplicationData) => {
          // Status is getting translated in frontend, and therefore sorting is not working since the backend doesn't know the translation
          // Therefore we do it manually in the frontend.
          if (orderByColumn !== "status") {
            return data;
          } else {
            data.data.sort((a: Application, b: Application) => {
              const valueA = a[orderByColumn];
              const valueB = b[orderByColumn];

              if (valueA === "NONE" && valueB !== "NONE") {
                return orderByDirection === "asc" ? 1 : -1;
              }
              if (valueA !== "NONE" && valueB === "NONE") {
                return orderByDirection === "asc" ? -1 : 1;
              }
              const translatedA = this.translate.instant("APPLICATION.STATUS." + valueA);
              const translatedB = this.translate.instant("APPLICATION.STATUS." + valueB);

              return translatedA.localeCompare(translatedB) * (orderByDirection === "asc" ? 1 : -1);
            });

            return data;
          }
        })
      );
  }

  deleteApplication(id: number) {
    const applicationToDelete = this.data?.find(app => app.id === id);

    this.deleteDialogService.showApplicationDialog(applicationToDelete).subscribe(response => {
      if (response) {
        this.applicationService.deleteApplication(id).subscribe(response => {
          if (response.ok && response.body.affected > 0) {
            this.paginator.page.emit({
              pageIndex: this.paginator.pageIndex,
              pageSize: this.paginator.pageSize,
              length: this.resultsLength,
            });
          } else {
            this.errorMessage = response?.error?.message;
          }
        });
      }
    });
  }

  navigateToEditPage(applicationId: string) {
    this.router.navigate(["applications", "edit-application", applicationId]);
  }

  mapControlledProperties(value: ControlledProperty[]) {
    if (!value.length) return "-";

    return value.map(p => p.type).join(", ");
  }

  mapDeviceTypes(value: ApplicationDeviceType[]) {
    const deviceTypeTranslationPrefix = "IOT-DEVICE-TYPES.";
    const deviceTypeTranslationKeys = ApplicationDeviceTypeEntries.map(x => `${deviceTypeTranslationPrefix}${x.key}`);

    const result = [];

    this.translate
      .get([...deviceTypeTranslationKeys, deviceTypeTranslationPrefix + "OTHER"])
      .subscribe(translations => {
        value.forEach(p => result.push(translations[deviceTypeTranslationPrefix + p.type]));
      });
    return result.length ? result.join(", ") : "-";
  }

  isOpenDataDK(dataTargets: Datatarget[]): boolean {
    const result = dataTargets.find(t => t.type === "OPENDATADK");

    return !!result;
  }

  onOpenChangeOrganizationDialog(id: number) {
    this.changeOrganizationDialog.open(ApplicationChangeOrganizationDialogComponent, {
      data: {
        applicationId: id,
      } as ApplicationDialogModel,
    });
  }

  protected readonly columnDefinitions = columnDefinitions;
}
