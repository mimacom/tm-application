import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from 'nativescript-angular/router';

import {AuthGuard} from '~/guards/auth.guard';
import {LoginComponent} from '~/pages/login/login.component';
import {RootComponent} from '~/pages/root/root.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'root',
        component: RootComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: '',
        redirectTo: '/root',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
