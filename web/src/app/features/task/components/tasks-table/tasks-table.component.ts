import { Component, Input } from '@angular/core';
import { Task } from "../../models/task.model";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-tasks-table',
    templateUrl: './tasks-table.component.html',
    styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent {
    displayedColumns: string[] = ["isDone", 'name', "status", "priority", "actions"];
    dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

    @Input({required: true}) set searchText(value: string) {
        this.applySearch(value)
    }

    @Input({required: true}) set tasks(value: Task[]) {
        // Note, changes may not fire setter: https://stackoverflow.com/a/34799257
        this.dataSource = new MatTableDataSource<Task>(value)
    }

    applySearch(searchText: string) {
        this.dataSource.filter = searchText.trim().toLowerCase();
    }
}
