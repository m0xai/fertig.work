import { Component, OnInit } from "@angular/core";
import { ProjectResourceService } from "../services/project-resource.service";
import { Project } from "../models/project.model";
import { Router } from "@angular/router";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
	projectList: Project[] = [];

	constructor(
		private projectResourceService: ProjectResourceService,
		private router: Router,
	) {}

	ngOnInit() {
		this.projectResourceService.fetch().subscribe({
			next: (value) => {
				this.projectList = value;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	navigateToProject(projectId: number | undefined) {
		if (projectId) {
			this.router.navigateByUrl("app/projects/" + projectId);
		}
	}
}
