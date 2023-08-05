import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/projects.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    TaskModule,
    ProjectModule
  ],
  exports: [HomeModule]
})
export class FeaturesModule {
}
