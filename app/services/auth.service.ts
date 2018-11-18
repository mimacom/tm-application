import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';

import {FetchResult} from 'apollo-link';
import {LoginLdap, LoginLdapGQL} from '~/gen/apollo';
import User = LoginLdap.User;
import {ExecResult} from 'apollo-cache-inmemory';

@Injectable({providedIn: 'root'})
export class AuthService {

    public static readonly AUTH_KEY = 'user_data';

    private internalToken: string;
    private internalUser: User;

    constructor(private apollo: Apollo,
                private router: Router,
                private loginLdap: LoginLdapGQL) {

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

    public login(username: string, password: string): Observable<ExecResult<LoginLdap.Mutation>> {

        return this.loginLdap.mutate({
            username,
            password
        }).pipe(
            tap((result) => {
                if (result.data.loginLdap) {
                    this.cacheData(result.data.loginLdap);
                    localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(result.data.loginLdap));
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

    private cacheData(data: LoginLdap.LoginLdap) {

        this.internalToken = data.token;
        this.internalUser = data.user;
    }
}
