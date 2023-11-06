import { Component, OnInit } from "@angular/core";
import { ProjectResourceService } from "../services/project-resource.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../models/project.model";
import {
	NotificationService,
	NotificationType,
} from "../../../shared/services/notification/notification.service";
import { TaskResourceService } from "../../task/services/task-resource.service";
import { Task } from "../../task/models/task.model";

@Component({
	selector: "app-project-detail",
	templateUrl: "./project-detail.component.html",
	styleUrls: ["./project-detail.component.css"],
})
export class ProjectDetailComponent implements OnInit {
	model = new Project();
	projectId = 0;
	lastTasks: Task[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private projectResourceService: ProjectResourceService,
		private notificationService: NotificationService,
		private taskResourceService: TaskResourceService,
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			this.projectId = +paramMap.get("id")!;
			this.projectResourceService.getById(+paramMap.get("id")!).subscribe({
				next: (val) => (this.model = val),
				error: (err) => {
					this.notificationService.notify(err.error.detail, NotificationType.error);
				},
			});
		});
	}

	getCollaborators() {
		this.taskResourceService;
	}
}
