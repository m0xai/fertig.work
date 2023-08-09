import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TaskModule } from '../task/task.module';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TaskModule,
    SharedModule,
  ],
  exports: []
})
export class HomeModule {
}
