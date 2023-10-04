import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Task } from "../../models/task.model";
import { MatTableDataSource } from "@angular/material/table";
import { TaskResourceService } from "../../services/task-resource.service";
import { MatSort } from "@angular/material/sort";

@Component({
	selector: "app-tasks-table",
	templateUrl: "./tasks-table.component.html",
	styleUrls: ["./tasks-table.component.css"],
})
export class TasksTableComponent {
	displayedColumns: string[] = ["isDone", "name", "status", "priority", "actions"];
	dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
	@Output() taskDeleted = new EventEmitter<Task>();
	@ViewChild(MatSort) private sort!: MatSort;

	constructor(private taskResourceService: TaskResourceService) {}

	@Input({ required: true }) set searchText(value: string) {
		this.applySearch(value);
	}

	@Input({ required: true }) set tasks(value: Task[]) {
		// Note, changes may not fire setter: https://stackoverflow.com/a/34799257
		this.dataSource = new MatTableDataSource<Task>(value);
		this.dataSource.sort = this.sort;
	}

	@Output()
	applySearch(searchText: string) {
		this.dataSource.filter = searchText.trim().toLowerCase();
	}

	updateTaskStatus(element: Task) {
		console.log(element);
		this.taskResourceService.update(element).subscribe((response) => {
			console.log("Resp: ", response);
		});
	}

	onTaskDeleted(task: Task) {
		// Just a bridge between task-actions(child) and (task-list-detail(parent)
		this.taskDeleted.emit(task);
	}
}
