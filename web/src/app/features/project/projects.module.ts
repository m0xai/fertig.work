import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ProjectCreateComponent } from "./components/project-create/project-create.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { ProjectDetailComponent } from "./components/project-detail/project-detail.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { ProjectEditComponent } from "./components/project-edit/project-edit.component";

@NgModule({
	declarations: [
		ProjectsComponent,
		ProjectCreateComponent,
		ProjectDetailComponent,
		ProjectEditComponent,
	],
	imports: [
		CommonModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCardModule,
		MatTooltipModule,
		MatChipsModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatTableModule,
		MatIconModule,
		RouterLink,
		RouterLinkActive,
		MatListModule,
	],
})
export class ProjectModule {}
