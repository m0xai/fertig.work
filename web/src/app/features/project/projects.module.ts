import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
	declarations: [ProjectsComponent, ProjectCreateComponent],
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
	],
})
export class ProjectModule {}
