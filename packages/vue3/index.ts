import type { App } from 'vue';
import * as components from './components';
import './_base/base.scss';

export const install = function (app: App) {
    Object.keys(components).forEach((key) => {
        const component = components[key];
        if (component.install) {
            app.use(component);
        }
    });
    return app;
};

export * from './components';
export default {
    install,
};
