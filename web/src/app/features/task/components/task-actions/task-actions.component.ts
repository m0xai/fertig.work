import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../../../../shared/components/form-dialog/form-dialog.component";
import { TaskService } from "../../services/task.service";


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.css']
})
export class TaskActionsComponent {
  @Input({required: true}) task?: Task;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
  }

  openDialog() {
    this.dialog.open(FormDialogComponent, {
      data: this.task,
      minHeight: "600px",
      minWidth: "6 fw00px"
    });
  }

  deleteTask() {
    if (this.task?.id) {
      this.taskService.delete(this.task.id)
    } else {
      console.error("Deryamcikkk")
      // Set error notification, after implementing notification service
    }
  }
}

