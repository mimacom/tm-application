import {Component, OnInit} from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import {Observable} from 'rxjs/internal/Observable';

import {Post, Query} from '~/gen/types';
import {drafts} from '~/graphql/query/drafts';
import {feeds as feedsQuery} from '~/graphql/query/feeds';
import {feeds as feedsSubscription} from '~/graphql/subscription/feeds';
import {DrawerPage} from '~/pages/drawer.page';
import {AuthService} from '~/services/auth.service';
import {StatusBar} from '~/util/native';

@Component({
    moduleId: module.id,
    selector: 'root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})
export class RootComponent extends DrawerPage implements OnInit {

    private drafts: Post[];
    private feedsQuery: QueryRef<any>;
    private feeds: Observable<any>;

    constructor(private authService: AuthService,
                private apollo: Apollo) {
        super();
    }

    public ngOnInit(): void {
        StatusBar.show();

        this.apollo.watchQuery<Query>({
            query: drafts
        }).valueChanges.subscribe((payload) => {
            this.drafts = payload.data.drafts;
        });

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
    }

    public logout(): void {
        this.authService.logout();
    }
}
