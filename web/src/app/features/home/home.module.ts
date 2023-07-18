import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TodoModule } from '../todo/todo.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TodoModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
