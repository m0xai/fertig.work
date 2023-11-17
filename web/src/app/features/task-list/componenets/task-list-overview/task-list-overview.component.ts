import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TaskListService } from "../../services/task-list.service";
import { TaskList } from "../../models/task-list.model";

@Component({
	selector: "app-task-list-overview",
	templateUrl: "./task-list-overview.component.html",
	styleUrls: ["./task-list-overview.component.css"],
})
export class TaskListOverviewComponent implements OnChanges {
	@Input({ required: true }) projectId?: number;
	taskListList: TaskList[] = [];

	constructor(private taskListService: TaskListService) {}

	getAllTaskList() {
		if (this.projectId) {
			this.taskListService.fetchByProject(this.projectId).subscribe((items) => {
				// Swallow copy with spread operator is okay here, since we have only one level in data structure
				this.taskListList = [...items];
			});
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["projectId"]) {
			this.getAllTaskList();
		}
	}
}
