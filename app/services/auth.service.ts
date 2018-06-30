import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

import {User} from '~/gen/types';
import {standard} from '~/graphql/mutation/login';

@Injectable({providedIn: 'root'})
export class AuthService {

    public static readonly AUTH_KEY = 'user_data';

    private internalToken: string;
    private internalUser: User;

    constructor(private apollo: Apollo,
                private router: Router) {

        const storageData = localStorage.getItem(AuthService.AUTH_KEY);
        if (storageData) {
            const data = JSON.parse(storageData);
            this.cacheData(data);
        }
    }

    get token(): string {
        return this.internalToken;
    }

    get user(): User {
        return this.internalUser;
    }

    public isAuthenticated(): boolean {
        return this.token && this.token !== '';
    }

    public login(username: string, password: string): Observable<any> {

        return this.apollo.mutate<any>({
            mutation: standard,
            variables: {
                username,
                password
            }
        }).pipe(
            map((payload: any) => {
                if (payload.data.login) {
                    this.cacheData(payload.data.login);
                    localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(payload.data.login));
                }
            })
        );
    }

    public logout() {
        // remove user from local storage to log user out
        this.internalToken = null;
        this.internalUser = null;
        localStorage.removeItem(AuthService.AUTH_KEY);
        this.router.navigate(['/login']);
    }

    private cacheData(data: { token: string, user: User }) {

        this.internalToken = data.token;
        this.internalUser = data.user;
    }
}
