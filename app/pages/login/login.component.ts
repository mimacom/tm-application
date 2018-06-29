import {Location} from '@angular/common';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from 'tns-core-modules/ui/page';
import {StandardPage} from '~/pages/standard.page';
import {AuthService} from '~/services/auth.service';
import {StatusBar} from '~/util/native';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends StandardPage implements OnInit {

    public user: { email?: string, password?: string };

    constructor(private location: Location,
                private router: Router,
                private page: Page,
                private authService: AuthService) {
        super(location);
    }

    public ngOnInit(): void {
        StatusBar.hide();
        this.page.actionBarHidden = true;
        this.user = {
            email: 'ivan.g.ortolan@mimacom.com',
            password: 'nooneknows'
        };
    }

    public login(): void {
        this.authService
            .login(this.user.email, this.user.password)
            .subscribe(() => {
                this.router.navigate(['/root']);
            });
    }
}
