import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface ConfirmDialogData {
	itemType: string;
}

@Component({
	selector: "app-confirm-dialog",
	templateUrl: "./confirm-dialog.component.html",
	styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
	) {}

	confirm() {
		this.dialogRef.close(true);
	}

	cancel() {
		this.dialogRef.close(false);
	}
}
