import { AfterContentInit, Directive } from "@angular/core";
import { MatSelect } from "@angular/material/select";

@Directive({
	selector: "[appOpenable]",
})
export class OpenableDirective implements AfterContentInit {
	constructor(private select: MatSelect) {}

	ngAfterContentInit() {
		// ngAfterContentInit and others gives ExpressionChangedAfterItHasBeenCheckedError
		setTimeout(() => {
			this.select.open();
		}, 100);
	}
}
