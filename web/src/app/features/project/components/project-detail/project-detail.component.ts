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

		this.getLatest10Tasks(this.projectId);
	}

	getLatest10Tasks(id: number) {
		this.taskResourceService.getLatest10Tasks(id).subscribe({
			next: (val) => {
				this.latest10Taks = val;
				console.log(val);
			},
			error: (err) =>
				this.notificationService.notify(
					"Latest 10 tasks couldn't fetched. Details: " + err,
					NotificationType.error,
				),
		});
	}

	deleteProject(id: number) {
		// TODO:  Delete also Collaborators
		this.projectResourceService.delete(id).subscribe({
			next: (val) => {
				this.router.navigateByUrl("app/projects");
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
}
