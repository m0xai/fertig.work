import { Injectable } from "@angular/core";
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

export enum NotificationType {
	success = 0,
	warning = 1,
	error = 2,
	info = 3,
}

export interface INotification {
	message: string;
	type: NotificationType;
	duration: number;
}

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	private duration = 5000;

	constructor(private _snacbar: MatSnackBar) {}

	notify(message: string, type: NotificationType) {
		const config = this.setTypeOfNotification(type);
		this._snacbar.open(message, undefined, config);
	}

	private setTypeOfNotification(type: NotificationType): MatSnackBarConfig {
		const config = {
			duration: this.duration,
			horizontalPosition: "end" as MatSnackBarHorizontalPosition,
			verticalPosition: "top" as MatSnackBarVerticalPosition,
			panelClass: [""],
		};
		switch (type) {
			case NotificationType.success:
				config.panelClass = ["notify-success"];
				break;
			case NotificationType.info:
				config.panelClass = ["notify-info"];
				break;
			case NotificationType.warning:
				config.panelClass = ["notify-warning"];
				break;
			case NotificationType.error:
				config.panelClass = ["notify-error"];
				break;
			default:
				config.panelClass = [];
		}
		return config;
	}
}
