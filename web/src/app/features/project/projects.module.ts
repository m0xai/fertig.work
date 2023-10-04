import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	declarations: [ProjectsComponent, ProjectCreateComponent],
	imports: [
		CommonModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class ProjectModule {}
