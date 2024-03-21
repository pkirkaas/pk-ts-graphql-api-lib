/**
 * Exports middlewares (standard & custom) and functions to attach them
 * to the Express application and routers
 */
import 'express-async-errors';
import { GenObj } from "pk-ts-node-lib";
export declare const middlewares: {};
/**
 *  Accepts express apps & routers and applies selected middlewares to them
 */
export declare function applyMiddlewares(app: any, config?: GenObj): void;
//# sourceMappingURL=middlewares.d.ts.map