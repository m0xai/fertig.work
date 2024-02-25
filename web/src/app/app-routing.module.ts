import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./features/user/components/login/login.component";
import { HomeComponent } from "./features/home/components/home/home.component";
import { LoginGuard } from "./shared/services/guards/login.guard";
import { TasksComponent } from "./features/task/components/tasks/tasks.component";
import { ProjectCreateComponent } from "./features/project/components/project-create/project-create.component";
import { ProjectsComponent } from "./features/project/components/projects/projects.component";
import { RegisterComponent } from "./features/user/components/register/register.component";
import { AppShellComponent } from "./shared/components/app-shell/app-shell.component";
import { LogoutGuard } from "./shared/services/guards/logout.guard";
import { ProjectDetailComponent } from "./features/project/components/project-detail/project-detail.component";

const routes: Routes = [
	// TODO: Redirect user to app, if already logged in
	{
		path: "login",
		component: LoginComponent,
		canActivate: [LogoutGuard],
		data: { title: "Login" },
	},
	{
		path: "register",
		component: RegisterComponent,
		canActivate: [LogoutGuard],
		data: { title: "Register" },
	},
	{
		path: "app",
		component: AppShellComponent,
		canActivate: [LoginGuard],
		children: [
			{ path: "home", component: HomeComponent, data: { title: "Home" } },
			{
				path: "projects",
				component: ProjectsComponent,
				data: { title: "Projects" },
			},
			{
				path: "projects/create",
				component: ProjectCreateComponent,
				data: { title: "Create Project" },
			},
			{
				path: "projects/:id",
				component: ProjectDetailComponent,
				data: { title: "Project Detail" },
			},
			{
				path: "projects/:id/tasks",
				component: TasksComponent,
				data: { title: "Tasks" },
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
