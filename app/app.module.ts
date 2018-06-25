import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";

import {ItemService} from "./item/item.service";
import {ItemsComponent} from "./item/items.component";
import {ItemDetailComponent} from "./item/item-detail.component";
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';

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
        HttpLinkModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
 Pass your application module to the bootstrapModule function located in main.ts to start your app
 */
export class AppModule {
    constructor(apollo: Apollo,
                httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({uri: "Http://backend-2111266174.eu-central-1.elb.amazonaws.com"})
            // other options like cache
        });
    }
}
