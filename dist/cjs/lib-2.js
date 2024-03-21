/**
 * Trying to componentize features
 */
import express from "express";
import 'express-async-errors';
export let eapp = express();
export function enhanceApp(app = null) {
    if (!app) {
        app = express();
    }
    app.listenPort = function (aport = null) {
        if (!aport) {
            aport = this.port;
        }
        if (!aport) {
            aport = this.get('port');
        }
        if (!aport) {
            aport = process.env.PORT || 3000;
        }
        return this.listen(aport, () => { console.log(`API server self listening on port [${aport}]`); });
    };
    return app;
}
/*
eapp.listenPort = function (aport: any = null) {
    if (!aport) {
        aport = this.port;
    }
    if (!aport) {
        aport = this.get('port');
    }
    if (!aport) {
        aport = process.env.PORT || 3000;
    }
    return this.listen(aport, () => { console.log(`API server self listening on port [${aport}]`) });
};
*/
/*
export function listenPort(port: any = null) {
}
*/
//# sourceMappingURL=lib-2.js.map