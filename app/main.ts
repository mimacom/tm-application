import {platformNativeScriptDynamic} from 'nativescript-angular/platform';

import {AppModule} from '~/app.module';
import {StatusBar} from '~/util/native';

StatusBar.setColor('#006968');

platformNativeScriptDynamic().bootstrapModule(AppModule);
