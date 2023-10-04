import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BaseAppComponent } from "./base-app.component";

describe("BaseAppComponent", () => {
	let component: BaseAppComponent;
	let fixture: ComponentFixture<BaseAppComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BaseAppComponent],
		});
		fixture = TestBed.createComponent(BaseAppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
