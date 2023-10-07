import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Task } from "src/app/features/task/models/task.model";
import { UserService } from "../../../features/user/services/user.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: "app-form-dialog",
	templateUrl: "./form-dialog.component.html",
	styleUrls: ["./form-dialog.component.css"],
})
export class FormDialogComponent implements OnInit, OnDestroy {
	createdBy = this.userService.getById(this.data?.createdBy!);
	public formGroup: FormGroup | any;
	public task: Task | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Task,
		private userService: UserService,
	) {}

	test() {
		if (this.data) {
			this.task = Task.create()
				.withName(this.data.name!)
				.withDescription(this.data.description!)
				.withTaskList(this.data.taskList!)
				.build();
		}
		this.createdBy.subscribe((user) => console.log(user));
	}

	ngOnDestroy() {
		console.log("Destroyed");
	}

	ngOnInit(): void {
		this.test();
		this.formGroup = new FormGroup<any>({
			name: new FormControl(this.task?.name, { nonNullable: true }),
			description: new FormControl(this.task?.description),
		});
	}

	getFormField(field: string) {
		return this.formGroup.get(field);
	}

	updateField(index: number, field: string) {
		const control: FormControl = this.formGroup.get(field);
		if (control.valid) {
			console.log("control is valid", { ...this.data, [field]: control.value });
			// Set new field value for the frontend form
			this.task = { ...this.task, [field]: control.value } as Task;
		}
	}
}
