import {Component, OnInit} from "@angular/core";
import {Apollo} from 'apollo-angular';

import {DrawerPage} from '~/pages/drawer.page';
import {AuthService} from '~/services/auth.service';
import {drafts} from '~/graphql/query/drafts';
import {Post} from '~/gen/types';

@Component({
    moduleId: module.id,
    selector: "root",
    templateUrl: "./root.component.html"
})
export class RootComponent extends DrawerPage implements OnInit {

    private drafts: Post[];

    constructor(private authService: AuthService,
                private apollo: Apollo) {
        super();
    }

    ngOnInit(): void {
        this.apollo.watchQuery<any>({
           query: drafts
        }).valueChanges.subscribe((payload) => {
           this.drafts = payload.data.drafts;
        });
    }

    logout(): void {
        this.authService.logout();
    }
}

