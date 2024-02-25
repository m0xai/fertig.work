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
import { AppShellComponent } from "./components/app-shell/app-shell.component";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { FormDialogEditableComponent } from "./components/form-dialog-editable/form-dialog-editable.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ViewModeDirective } from "./directives/view-mode/view-mode.directive";
import { EditModeDirective } from "./directives/edit-mode/edit-mode.directive";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FocusableDirective } from "./directives/focusable/focusable.directive";
import { OpenableDirective } from "./directives/openable/openable.directive";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HeaderMenuItemsComponent } from "./components/header/header-menu-items/header-menu-items.component";
import { ContentLayoutComponent } from "./components/content-layout/content-layout.component";

@NgModule({
	declarations: [
		HeaderComponent,
		FwAlertComponent,
		AppShellComponent,
		FormDialogComponent,
		ConfirmDialogComponent,
		FormDialogEditableComponent,
		EditModeDirective,
		ViewModeDirective,
		FocusableDirective,
		OpenableDirective,
		HeaderMenuItemsComponent,
		ContentLayoutComponent,
	],
	exports: [HeaderComponent, FwAlertComponent, ConfirmDialogComponent, FormDialogComponent],
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
		MatTooltipModule,
	],
})
export class SharedModule {}
