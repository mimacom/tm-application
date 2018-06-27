import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';

import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";

import {LoginComponent} from '~/pages/login/login.component';
import {RootComponent} from '~/pages/root/root.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '~/util/jwt.interceptor';
import {AuthInterceptor} from '~/util/auth.interceptor';
import {AuthGuard} from '~/guards/auth.guard';
import {AuthService} from '~/services/auth.service';

require("nativescript-localstorage");

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
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
        apollo.create({
            link: httpLink.create({uri: "http://backend-2111266174.eu-central-1.elb.amazonaws.com/"}),
            cache: new InMemoryCache()
        });
    }
}
