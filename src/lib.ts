/**
 * Library of useful, general Express API functions & initializations
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
	getDirname, dbgWrt,
	getFilename, slashPath, typeOf,
	//} from "pk-ts-sqlite-lib";
} from "pk-ts-node-lib";


// Create an Express app
export const app = express();
//const dirName = '.';
//const staticDir = '../../fe/public';
const dirName = getDirname(import.meta.url);
//const staticDir = slashPath(getDirname(import.meta.url, '../../fe/public'));
//const staticDir = slashPath(dirName, '../../fe/public');

const port =  process.env.PORT || 3000;
await killPort(port);

// Enable CORS
app.use(cors());

// Try out compression - but check if it all works?
// compress all responses
app.use(compression());
// Express configuration
app.set('port', port);

// Parse JSON requests
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Create a new router object
export const apiRouter = express.Router();








