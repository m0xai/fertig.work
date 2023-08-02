import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FwAlertComponent} from './components/fw-alert/fw-alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FwAlertComponent
  ],
  exports: [
    HeaderComponent,
    FwAlertComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatToolbarModule
  ]
})
export class SharedModule {
}
