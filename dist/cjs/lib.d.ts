/**
 * Library of useful, general Express API functions & initializations. Can be used by NestJS as well, hopefully
 *
 * TODO: Generalize!!!
 *
 * TODO: Make sure can use both NestJS app and regular express...
 * Think about logging/loggers, middlewae,
 * sessions, session implementation, auth, etc.
 */
import 'express-async-errors';
import { GenObj } from "pk-ts-node-lib";
export declare let port: any;
export declare function getPort(aPort?: any): any;
export declare let defaultRelStaticPath: string;
export declare let app: any;
/**
 * Implementing API can create a custom app, or default to Express.
 * @param anApp ? Optional Initialize app
 * @return an app instance - express, NestJS, etc
 */
export declare function getApp(anApp?: any): any;
/**
 * If false, returns default static path based on current working directory & defaultRelStaticPath
 * If
 */
export declare function getStaticPath(apath?: any): any;
/**
 * Initialize the API to use Cors, bodyParser, whatever
 * @param opts:object - use cors, what port, base URL, etc. Has some defaults.
 *   app: null (defaults to express()).  or an app
 *   cors: boolean (true),
 *   port: empty|number (defaults to process.env.PORT or 3000),
 *   compression: boolean (true),
 *   killPort : booldean (true), // For dev - kill if api already running on port FOR DEV
 *   urlencoded: boolean (true) - if true, use extended
 *   static: boolean (true) | string (relative path or absolute path),
 *   apiBase : string (defaults to 'api'),
 *
 *
 *
 * @return initialized app
 */
/**
 * Returns an express app w. GraphQL middleware -
 * @param opts
 * @returns
 */
export declare function initApp(opts?: GenObj): Promise<any>;
//# sourceMappingURL=lib.d.ts.map