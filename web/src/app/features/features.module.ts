import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/projects.module";
import { HomeModule } from "./home/home.module";
import { TaskModule } from "./task/task.module";
import { TaskListModule } from "./task-list/task-list.module";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		UserModule,
		HomeModule,
		ProjectModule,
		TaskModule,
		TaskListModule,
	],
	exports: [HomeModule],
})
export class FeaturesModule {}
