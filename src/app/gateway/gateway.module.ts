import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { FormsModule } from '@angular/forms';
import { GatewayDetailComponent } from './gateway-detail/gateway-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { SharedModule } from '@shared/shared.module';
import { PipesModule } from '@shared/pipes/pipes.module';

const gatewayRoutes: Routes = [
  {
    path: '',
    component: GatewaysComponent,
    children: [
      { path: '', component: GatewayListComponent },
      { path: 'gateway-edit/:id', component: GatewayEditComponent },
      { path: 'gateway-edit', component: GatewayEditComponent },
      { path: 'gateway-detail/:id', component: GatewayDetailComponent }
    ]
  }
];


@NgModule({
  declarations: [
    GatewayTableComponent,
    GatewaysComponent,
    GatewayListComponent,
    GatewayDetailComponent,
    GatewayEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormModule,
    FormsModule,
    FontAwesomeModule,
    NGMaterialModule,
    RouterModule.forChild(gatewayRoutes),
    SharedModule,
    PipesModule,
  ],
  exports: [
    GatewayTableComponent,
    GatewaysComponent,
    GatewayListComponent,
    GatewayEditComponent,
    RouterModule
  ]
})
export class GatewayModule { }
