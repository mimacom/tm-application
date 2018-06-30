import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';

import {Query, Test} from '~/gen/types';
import {tests} from '~/graphql/query/tests';
import {DrawerPage} from '~/pages/drawer.page';
import {AuthService} from '~/services/auth.service';
import {StatusBar} from '~/util/native';
import {Observable} from 'rxjs/internal/Observable';

@Component({
    moduleId: module.id,
    selector: 'root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})
export class RootComponent extends DrawerPage implements OnInit {

    private tests: Observable<any>;

    // private feedsQuery: QueryRef<any>;
    // private feeds: Observable<any>;

    constructor(private authService: AuthService,
                private apollo: Apollo) {
        super();
    }

    public ngOnInit(): void {
        StatusBar.show();

        this.tests = this.apollo.watchQuery<Query>({
            query: tests
        }).valueChanges;

        /*
         this.feedsQuery = this.apollo.watchQuery<Query>({
         query: feedsQuery
         });

         this.feeds = this.feedsQuery.valueChanges;

         this.feedsQuery.subscribeToMore({
         document: feedsSubscription,
         updateQuery: (previousQueryResult, {subscriptionData}) => {
         if (!subscriptionData.data) {
         return previousQueryResult;
         }

         const newFeedItem = subscriptionData.data.node;

         return {
         ...previousQueryResult,
         entry: {
         comments: [newFeedItem, ...previousQueryResult.feed]
         }
         };
         }
         });
         */
    }

    public logout(): void {
        this.authService.logout();
    }
}
