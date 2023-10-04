import { Component, Input, OnInit } from "@angular/core";
import { TaskList } from "../../models/task-list.model";
import { TaskResourceService } from "../../../task/services/task-resource.service";
import { Task } from "src/app/features/task/models/task.model";

@Component({
	selector: "app-task-list-detail",
	templateUrl: "./task-list-detail.component.html",
	styleUrls: ["./task-list-detail.component.css"],
})
export class TaskListDetailComponent implements OnInit {
	@Input({ required: true }) taskList: TaskList | undefined;
	public searchInTaskList = "";

	tasksOfList: Task[] = [];

	constructor(private taskResourceService: TaskResourceService) {}

	getTasksByList() {
		this.taskResourceService
			.getTasksByList(this.taskList?.id)
			.subscribe((items) => {
				this.tasksOfList = items;
			});
	}

	ngOnInit(): void {
		this.getTasksByList();
	}
}
