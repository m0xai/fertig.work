import { TestBed } from '@angular/core/testing';
import { TaskResourceService } from "./task-resource.service";

describe('TodosService', () => {
    let service: TaskResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
