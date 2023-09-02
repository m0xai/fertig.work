import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Task } from 'src/app/features/task/models/task.model';


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {
  }
}
