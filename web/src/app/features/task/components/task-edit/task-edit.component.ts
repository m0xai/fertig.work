import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../../../../shared/components/form-dialog/form-dialog.component";


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {
  @Input({required: true}) task?: Task;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(FormDialogComponent, {
      data: {
        name: this.task?.name
      },
    });
  }
}

