import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

import {standard} from '~/graphql/mutation/login';
import {User} from '~/gen/types';

@Injectable({providedIn: 'root'})
export class AuthService {

    static readonly AUTH_KEY = 'user_data';

    private _token: string;
    private _user: User;

    constructor(private apollo: Apollo,
                private router: Router) {

        const storageData = localStorage.getItem(AuthService.AUTH_KEY);
        if (storageData) {
            const data = JSON.parse(storageData);
            this.cacheData(data);
        }
    }

    get token(): string {
        return this._token;
    }

    get user(): User {
        return this._user;
    }

    isAuthenticated(): boolean {
        return this.token && this.token !== '';
    }

    login(username: string, password: string): Observable<any> {

        return this.apollo.mutate<any>({
            mutation: standard,
            variables: {
                email: username,
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

    logout() {
        // remove user from local storage to log user out
        this._token = null;
        this._user = null;
        localStorage.removeItem(AuthService.AUTH_KEY);
        this.router.navigate(['/login']);
    }

    private cacheData(data: { token: string, user: User }) {

        this._token = data.token;
        this._user = data.user;
    }
}