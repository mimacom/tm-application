import {Component, OnInit} from "@angular/core";
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {Page} from '~/pages/page';
import {AuthService} from '~/services/auth.service';

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "./login.component.html"
})
export class LoginComponent extends Page implements OnInit {

    constructor(private location: Location,
                private router: Router,
                private authService: AuthService) {
        super(location);
    }

    ngOnInit(): void {
    }

    login(): void {
        this.authService
            .login("ivan.g.ortolan@mimacom.com", "nooneknows")
            .subscribe(() => {
                this.router.navigate(['/root']);
            });
    }
}

