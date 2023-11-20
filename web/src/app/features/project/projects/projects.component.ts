import { Component, OnInit } from "@angular/core";
import { ProjectResourceService } from "../services/project-resource.service";
import { Project } from "../models/project.model";
import { Router } from "@angular/router";
import { NotificationService } from "../../../shared/services/notification/notification.service";

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
		private notificationService: NotificationService,
	) {}

	ngOnInit() {
		this.projectResourceService.fetch().subscribe({
			next: (value) => {
				this.projectList = value;
			},
			error: (err) => {
				this.notificationService.notify("Cannot navigate to project.", err.error);
			},
		});
	}

	navigateToProject(projectId: number | undefined) {
		if (projectId) {
			this.router.navigateByUrl("app/projects/" + projectId);
		}
	}
}
