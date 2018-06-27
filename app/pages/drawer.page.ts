import {ViewChild} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';

export class DrawerPage {

    @ViewChild(RadSideDrawerComponent) protected drawerComponent: RadSideDrawerComponent;

    constructor() {
    }

    protected showDrawer() {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    protected closeDrawer() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }
}
