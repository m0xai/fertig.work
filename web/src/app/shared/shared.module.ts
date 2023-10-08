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
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { FormDialogEditableComponent } from "./components/form-dialog-editable/form-dialog-editable.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ViewModeDirective } from "./directives/view-mode/view-mode.directive";
import { EditModeDirective } from "./directives/edit-mode/edit-mode.directive";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FocusableDirective } from './directives/focusable/focusable.directive';
import { OpenableDirective } from './directives/openable/openable.directive';

@NgModule({
	declarations: [
		HeaderComponent,
		FwAlertComponent,
		BaseAppComponent,
		FormDialogComponent,
		ConfirmDialogComponent,
		FormDialogEditableComponent,
		EditModeDirective,
		ViewModeDirective,
  FocusableDirective,
  OpenableDirective,
	],
	exports: [HeaderComponent, FwAlertComponent, ConfirmDialogComponent],
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
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
	],
})
export class SharedModule {}
