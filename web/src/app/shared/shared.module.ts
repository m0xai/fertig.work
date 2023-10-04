import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FwAlertComponent } from "./components/fw-alert/fw-alert.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { BaseAppComponent } from "./components/base-app/base-app.component";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [
		HeaderComponent,
		FwAlertComponent,
		BaseAppComponent,
		FormDialogComponent,
	],
	exports: [HeaderComponent, FwAlertComponent],
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatListModule,
		MatBadgeModule,
		MatMenuModule,
		RouterOutlet,
		MatDialogModule,
	],
})
export class SharedModule {}
