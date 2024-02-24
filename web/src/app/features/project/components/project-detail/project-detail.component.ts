import { Component, OnInit } from "@angular/core";
import { ProjectResourceService } from "../../services/project-resource.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../models/project.model";
import {
	NotificationService,
	NotificationType,
} from "../../../../shared/services/notification/notification.service";
import { TaskResourceService } from "../../../task/services/task-resource.service";
import { lightFormat } from "date-fns";
import { TasksCount } from "../../../task/models/task-count.model";
import { Task } from "src/app/features/task/models/task.model";
import { CollaboratorResourceService } from "../../services/collaborator-resource.service";
import { Collaborator } from "../../models/collaborator.model";

@Component({
	selector: "app-project-detail",
	templateUrl: "./project-detail.component.html",
	styleUrls: ["./project-detail.component.css"],
})
export class ProjectDetailComponent implements OnInit {
	model = new Project();
	projectId = 0;
	tasksCount: TasksCount | undefined;
	latest10Taks: Task[] = [];
	projectCollaborators: Collaborator[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private projectResourceService: ProjectResourceService,
		private collaboratorResourceService: CollaboratorResourceService,
		private notificationService: NotificationService,
		private taskResourceService: TaskResourceService,
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			this.projectId = +paramMap.get("id")!;
			this.projectResourceService.getById(+paramMap.get("id")!).subscribe({
				next: (val) => {
					this.model = val;
				},
				error: (err) => {
					this.notificationService.notify(err.error.detail, NotificationType.error);
				},
			});
		});

		this.taskResourceService.getTasksCountByProject(this.projectId).subscribe({
			next: (data: TasksCount) => {
				this.tasksCount = data;
			},
			error: (err) => this.notificationService.notify(err, NotificationType.error),
		});

		if (this.projectId) {
			this.getLatest10Tasks(this.projectId);
			this.getProjectCollaborators(this.projectId);
		}
	}

	getLatest10Tasks(id: number) {
		this.taskResourceService.getLatest10Tasks(id).subscribe({
			next: (val) => {
				this.latest10Taks = val;
			},
			error: (err) =>
				this.notificationService.notify(
					"Latest 10 tasks couldn't fetched. Details: " + err,
					NotificationType.error,
				),
		});
	}

	deleteProject(id: number) {
		// TODO:  Delete also Collaborators, while deleting a project in backend
		this.projectResourceService.delete(id).subscribe({
			next: (val) => {
				if (val !== undefined) this.router.navigateByUrl("app/projects");
			},
			error: (error) => {
				this.notificationService.notify(error.message, NotificationType.error);
			},
		});
	}

	formatStartOn(date: Date) {
		if (date) {
			return lightFormat(new Date(date), "dd.MM.yyyy");
		}
		return "";
	}

	private getProjectCollaborators(projectId: number) {
		return this.collaboratorResourceService.list(projectId).subscribe({
			next: (v) => (this.projectCollaborators = v),
			error: (e) =>
				this.notificationService.notify(
					"An error occurred while getting",
					NotificationType.error,
				),
		});
	}
}
