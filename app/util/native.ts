import * as application from 'application';
import * as platform from 'platform';

import {Color} from 'color';

const android = application.android;

export class StatusBar {

    public static setColor(hexcode: string): void {

        if (android) {
            android.on(application.AndroidApplication.activityCreatedEvent, () => {
                if (platform.device.sdkVersion >= '21') {
                    const window = application.android.startActivity.getWindow();
                    window.setStatusBarColor(new Color(hexcode).android);
                }
            });
        }
    }

    public static show() {
        if (application.android) {
            const activity = application.android.startActivity;
            const win = activity.getWindow();
            win.clearFlags(1024);
        }
    }

    public static hide() {
        if (application.android) {
            const activity = application.android.startActivity;
            const win = activity.getWindow();
            win.addFlags(1024);
        }
    }
}
