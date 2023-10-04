import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TaskListOverviewComponent } from "./task-list-overview.component";

describe("TaskListOverviewComponent", () => {
	let component: TaskListOverviewComponent;
	let fixture: ComponentFixture<TaskListOverviewComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TaskListOverviewComponent],
		});
		fixture = TestBed.createComponent(TaskListOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
