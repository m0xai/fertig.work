import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { SharedTaskModule } from "../../shared/modules/shared-task/shared-task.module";

@NgModule({
	// The imports and exports of this module's component can be found in shared-task modules
	declarations: [],
	imports: [CommonModule, MatInputModule, FormsModule, MatListModule, SharedTaskModule],
	exports: [],
})
export class TaskListModule {}
