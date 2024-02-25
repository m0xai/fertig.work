import { Component, OnInit } from "@angular/core";
import { ETaskPriority, ETaskStatus, Task } from "../../models/task.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { TitleService } from "../../../../shared/services/title.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectResourceService } from "../../../project/services/project-resource.service";
import {
	NotificationService,
	NotificationType,
} from "../../../../shared/services/notification/notification.service";
import { Project } from "../../../project/models/project.model";

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
	projectId = 0;
	tasks: Task[] = [];
	public taskPriority = Object.values(ETaskPriority);
	public taskStatus = Object.values(ETaskStatus);
	project: Project | null = null;

	taskForm = new FormGroup({
		name: new FormControl<string>("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
		description: new FormControl("", { nonNullable: true }),
		// TaskListModel should be in request, but not editable
		taskList: new FormControl<number>(0, { nonNullable: true }),
		createdBy: new FormControl<number>(0, { nonNullable: true }),
		priority: new FormControl(ETaskPriority.NORMAL, { nonNullable: true }),
		status: new FormControl(ETaskStatus.OPEN, { nonNullable: true }),
	});

	constructor(
		private route: ActivatedRoute,
		private titleService: TitleService,
		private notificationService: NotificationService,
		private projectResourceService: ProjectResourceService,
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((params: ParamMap) => {
			// This will be always update projectId param of task-list-overview component and triggers onChange there
			this.projectId = Number(params.get("id"));
			this.getProject(this.projectId);
		});
	}

	getProject(id: number) {
		this.projectResourceService.getById(id).subscribe({
			next: (val) => {
				this.project = val;
				this.setPageTitle(val.title!);
			},
			error: (err) =>
				this.notificationService.notify(
					"An error occurred while fetching project details: " + err,
					NotificationType.error,
				),
		});
	}

	setPageTitle(projectName: string) {
		this.titleService.setTitle(projectName + " Tasks");
	}

	getErrorMessage() {
		return "Hoppla!";
	}
}
