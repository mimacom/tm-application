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
        this.apollo.mutate({
            mutation: gql(`
                mutation login {
                    login (email: "ivan.g.ortolan@mimacom.com", password: "nooneknows") {
                        token
                    }
                }
            `)
        }).subscribe((result) => console.log(result));
    }
}
