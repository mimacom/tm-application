import {Location} from '@angular/common';

export class StandardPage {

    constructor(private internalLocation: Location) {
    }

    public goBack(): void {
        this.internalLocation.back();
    }
}
