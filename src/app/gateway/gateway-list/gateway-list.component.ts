import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {

  public pageLimit: number = 10;
  public selectedSortId: number = 1;
  public selectedSortObject: Sort = {
    id: 1,
    dir: 'ASC',
    col: 'name',
    label: 'SORT.NAME-ASCENDING',
  };

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void {
  }

  updatePageLimit(limit: any) {
    console.log(limit);
  }
}
