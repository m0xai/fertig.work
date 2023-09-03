import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/projects.module';
import { HomeModule } from './home/home.module';
import { TaskModule } from './task/task.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserModule,
        HomeModule,
        ProjectModule,
        TaskModule,
    ],
    exports: [HomeModule, TaskModule,]
})
export class FeaturesModule {
}
