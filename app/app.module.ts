import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';

import {AppComponent} from '~/app.component';
import {AppRoutingModule} from '~/app.routing';
import {AuthGuard} from '~/guards/auth.guard';
import {LoginComponent} from '~/pages/login/login.component';
import {RootComponent} from '~/pages/root/root.component';
import {AuthService} from '~/services/auth.service';
import {AuthInterceptor} from '~/util/auth.interceptor';
import {JwtInterceptor} from '~/util/jwt.interceptor';

import {OperationDefinitionNode} from 'graphql';
import 'nativescript-localstorage';

const NativeWebSocket = require('nativescript-websockets');
const CONFIG = require('./config/config.json');

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        ApolloModule,
        HttpLinkModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RootComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {

    constructor(apollo: Apollo,
                httpLink: HttpLink) {

        const link = httpLink.create({
            uri: CONFIG.apiEndpoint
        });

        /*
        const ws = new WebSocketLink({
            uri: CONFIG.apiWsEndpoint,
            options: {
                reconnect: true
            },
            webSocketImpl: NativeWebSocket
        });

        const link = split(
            // split based on operation type
            ({query}) => {
                const {kind, operation} = getMainDefinition(query) as OperationDefinitionNode;
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            ws,
            http
        );
        */

        apollo.create({
            link,
            cache: new InMemoryCache()
        });

    }
}
