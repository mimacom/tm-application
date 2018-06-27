import {Component} from "@angular/core";
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent {

    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
    }
}
