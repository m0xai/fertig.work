import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FwAlertComponent } from "./fw-alert.component";

describe("FwAlertComponent", () => {
	let component: FwAlertComponent;
	let fixture: ComponentFixture<FwAlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FwAlertComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FwAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
