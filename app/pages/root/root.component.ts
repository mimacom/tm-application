import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/internal/Observable';

import {map, tap} from 'rxjs/operators';
import {MeGQL, MesubGQL} from '~/gen/apollo';
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

    private $me: Observable<any>;
    private $meSub: Observable<any>;

    constructor(private authService: AuthService,
                private apollo: Apollo,
                private me: MeGQL,
                private meSub: MesubGQL) {
        super();
    }

    public ngOnInit(): void {
        StatusBar.show();

        this.$me = this.me
            .watch()
            .valueChanges
            .pipe(
                map((result) => result.data.me)
            );

        this.$meSub = this.meSub
            .subscribe()
            .pipe(
                map((result) => result.data.me.node)
            );

    }

    public logout(): void {
        this.authService.logout();
    }
}
