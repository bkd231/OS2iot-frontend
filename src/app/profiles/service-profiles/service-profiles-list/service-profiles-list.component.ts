import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ServiceProfile,
  ServiceProfileResponseMany,
} from '../service-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceProfileService } from '../service-profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-service-profiles-list',
  templateUrl: './service-profiles-list.component.html',
  styleUrls: ['./service-profiles-list.component.scss'],
})
export class ServiceProfilesListComponent implements OnInit, OnDestroy {
  serviceProfiles: ServiceProfile[];
  serviceSubscription: Subscription;
  public pageLimit: 10;
  public pageOffset: 0;

  public errorMessages: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceProfileService: ServiceProfileService
  ) {}

  ngOnInit() {
    this.getServiceProfileList();
  }

  getServiceProfileList() {
    this.serviceSubscription = this.serviceProfileService
      .getMultiple()
      .subscribe((result: ServiceProfileResponseMany) => {
        this.serviceProfiles = result.result;
      });
  }

  onNewServiceProfile() {
    this.router.navigate(['new-service-profile'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.serviceSubscription && this.serviceSubscription?.closed) {
      this.serviceSubscription.unsubscribe();
    }
  }

  deleteServiceProfile(id: string) {
    if (id) {
      this.serviceProfileService.delete(id).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.getServiceProfileList();
          } else {
            this.showError(response);
          }
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
    }
  }
  
  private showError(err: HttpErrorResponse) {
    if (err?.error?.message == 'Internal server error') {
      this.errorMessages = 'Internal server error';
      return;
    }

    if (err.error?.message) {
      this.errorMessages = err.error?.message;
    }
  }
}