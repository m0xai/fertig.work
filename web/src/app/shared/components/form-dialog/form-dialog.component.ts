import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ETaskPriority, ETaskStatus, Task } from "src/app/features/task/models/task.model";
import { UserService } from "../../../features/user/services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-form-dialog",
	templateUrl: "./form-dialog.component.html",
	styleUrls: ["./form-dialog.component.css"],
})
export class FormDialogComponent implements OnInit, OnDestroy {
	@Output() closeDialogOutput = new EventEmitter();
	@Output() taskFieldUpdated = new EventEmitter();
	public formGroup: FormGroup | any;
	public task: Task = Task.create().build();
	protected readonly ETaskPriority = ETaskPriority;
	protected readonly Object = Object;
	protected readonly ETaskStatus = ETaskStatus;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Task,
		private userService: UserService,
	) {}

	test() {
		if (this.data) {
			this.task = Task.create()
				.withName(this.data.name!)
				.withDescription(this.data.description!)
				.withPriority(this.data.priority!)
				.withStatus(this.data.status!)
				.withTaskList(this.data.taskList!)
				.build();
		}
	}

	ngOnDestroy() {
		console.log("Destroyed");
	}

	ngOnInit(): void {
		this.test();
		this.formGroup = new FormGroup<any>({
			name: new FormControl(this.task?.name, { nonNullable: true }),
			description: new FormControl(this.task?.description, Validators.max(1000)),
			priority: new FormControl(this.task?.priority),
			status: new FormControl(this.task?.status),
		});
	}

	getFormField(field: string) {
		return this.formGroup.get(field);
	}

	updateField(field: string) {
		const control: FormControl = this.formGroup.get(field);
		if (control.valid) {
			console.log("control is valid", { ...this.data, [field]: control.value });
			// Set new field value for the frontend form
			this.task = { ...this.task, [field]: control.value } as Task;
		}
	}

	closeDialog() {
		this.closeDialogOutput.emit();
	}
}
