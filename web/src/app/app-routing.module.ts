import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/components/login/login.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { LoginGuard } from "./shared/services/guards/login.guard";
import { TasksComponent } from "./features/task/components/tasks/tasks.component";
import { ProjectCreateComponent } from "./features/project/project-create/project-create.component";
import { ProjectsComponent } from "./features/project/projects/projects.component";
import { RegisterComponent } from "./features/user/components/register/register.component";
import { BaseAppComponent } from "./shared/components/base-app/base-app.component";
import { LogoutGuard } from "./shared/services/guards/logout.guard";

const routes: Routes = [
  // TODO: Redirect user to app, if already logged in
  {path: 'login', component: LoginComponent, canActivate: [LogoutGuard], data: {title: "Login"}},
  {path: 'register', component: RegisterComponent, canActivate: [LogoutGuard], data: {title: "Register"}},
  {
    path: "app", component: BaseAppComponent, canActivate: [LoginGuard],
    children: [
      {path: 'home', component: HomeComponent, data: {title: "Home"}},
      {path: 'tasks', component: TasksComponent, data: {title: "Tasks"}},
      {path: 'projects', component: ProjectsComponent, data: {title: "Projects"}},
      {path: 'projects/create', component: ProjectCreateComponent, data: {title: "Create Project"}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
