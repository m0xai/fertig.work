import { AfterContentInit, Directive, ElementRef } from "@angular/core";

@Directive({
	selector: "[appFocusable]",
})
export class FocusableDirective implements AfterContentInit {
	constructor(private host: ElementRef) {}

	ngAfterContentInit() {
		this.host.nativeElement.focus();
	}
}
