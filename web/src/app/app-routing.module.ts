import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/components/login/login.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { LoginGuard } from "./shared/services/login.guard";
import { TasksComponent } from "./features/task/components/tasks/tasks.component";
import { ProjectCreateComponent } from "./features/project/project-create/project-create.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {title: "Login"}},
  {path: 'home', canActivate: [LoginGuard], component: HomeComponent, data: {title: "Home"}},
  {path: 'tasks', canActivate: [LoginGuard], component: TasksComponent, data: {title: "Tasks"}},
  {
    path: 'projects/create', canActivate: [LoginGuard], component: ProjectCreateComponent, data: {
      title: "Create Project"
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
