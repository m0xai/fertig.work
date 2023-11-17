import { Component, OnInit } from "@angular/core";
import { ETaskPriority, ETaskStatus, Task } from "../../models/task.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { TitleService } from "../../../../shared/services/title.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((params: ParamMap) => {
			// This will be always update projectId param of task-list-overview component and triggers onChange there
			this.projectId = Number(params.get("id"));
		});
		this.titleService.setTitle(this.route.snapshot.data["title"]);
	}

	getErrorMessage() {
		return "Hoppla!";
	}
}
