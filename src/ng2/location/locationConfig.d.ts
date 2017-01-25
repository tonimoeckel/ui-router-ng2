/** @module ng2 */
/** */
import { UIRouter } from "ui-router-core";
import { LocationStrategy } from "@angular/common";
export declare class Ng2LocationConfig {
    private _locationStrategy;
    private _isHtml5;
    private _hashPrefix;
    constructor(router: UIRouter, _locationStrategy: LocationStrategy);
    dispose(): void;
    port: () => number;
    protocol: () => string;
    host: () => string;
    baseHref: () => string;
    html5Mode: () => boolean;
    hashPrefix: (newprefix?: string) => string;
}
