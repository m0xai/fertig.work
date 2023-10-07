import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormDialogEditableComponent } from "./form-dialog-editable.component";

describe("FormDialogEditComponent", () => {
	let component: FormDialogEditableComponent;
	let fixture: ComponentFixture<FormDialogEditableComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FormDialogEditableComponent],
		});
		fixture = TestBed.createComponent(FormDialogEditableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
