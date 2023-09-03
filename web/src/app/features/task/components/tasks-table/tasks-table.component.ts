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

    @Input({required: true}) set tasks(value: Task[]) {
        this.dataSource = new MatTableDataSource<Task>(value)
    }

    applySearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log("DS: ", filterValue, this.dataSource);
    }

}
