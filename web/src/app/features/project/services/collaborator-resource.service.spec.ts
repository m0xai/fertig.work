import { TestBed } from "@angular/core/testing";

import { CollaboratorResourceService } from "./collaborator-resource.service";

describe("CollaboratorResourceService", () => {
	let service: CollaboratorResourceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CollaboratorResourceService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
