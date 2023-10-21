import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectResourceService } from "../services/project-resource.service";
import { Project } from "../models/project.model";

@Component({
	selector: "app-project-create",
	templateUrl: "./project-create.component.html",
	styleUrls: ["./project-create.component.css"],
})
export class ProjectCreateComponent {
	// TODO: Set FormGroup generic type properly
	firstFormGroup: FormGroup<any> = this._formBuilder.group({
		title: ["", Validators.required],
		description: "",
		color: ["", Validators.required],
		startOn: [new Date(), Validators.required],
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ["", Validators.required],
	});
	isLinear = false;

	constructor(
		private _formBuilder: FormBuilder,
		private projectResourceService: ProjectResourceService,
	) {}

	submitCreateProjectForm() {
		if (this.firstFormGroup.valid) {
			this.projectResourceService.create(new Project(this.firstFormGroup.value)).subscribe({
				// TODO: redirect users to project page after creation of project
				next: (resp) => console.log("Sent", resp),
				error: (err) => console.error(err),
			});
		}
	}
}
