/**
 * Exports middlewares (standard & custom) and functions to attach them
 * to the Express application and routers
 */



import path from 'path';
import util from 'util';
import killPort from 'kill-port';
import _ from "lodash";
import express from "express";
import compression from "compression";
import 'express-async-errors';

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
	getDirname, dbgWrt, GenObj, cwd,
	getFilename, slashPath, typeOf,
	//} from "pk-ts-sqlite-lib";
} from "pk-ts-node-lib";


export const middlewares = {
};

/** 
 *  Accepts express apps & routers and applies selected middlewares to them
 */
export function applyMiddlewares(app, config: GenObj = {}) {
}