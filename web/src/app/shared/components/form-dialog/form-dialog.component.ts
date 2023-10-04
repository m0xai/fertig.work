import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Task } from "src/app/features/task/models/task.model";
import { UserService } from "../../../features/user/services/user.service";

@Component({
	selector: "app-form-dialog",
	templateUrl: "./form-dialog.component.html",
	styleUrls: ["./form-dialog.component.css"],
})
export class FormDialogComponent implements OnInit {
	createdBy = this.userService.getById(this.data?.createdBy!);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Task,
		private userService: UserService,
	) {}

	test() {
		this.createdBy.subscribe((user) => console.log(user));
	}

	ngOnInit(): void {
		this.test();
	}
}
