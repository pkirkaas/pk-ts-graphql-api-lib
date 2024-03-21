/**
 * Library of useful, general Express API functions & initializations. Can be used by NestJS as well, hopefully
 * 
 * TODO: Generalize!!!
 * 
 * TODO: Make sure can use both NestJS app and regular express...
 * Think about logging/loggers, middlewae, 
 * sessions, session implementation, auth, etc.
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
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'; //A plugin to help apollo server gracefully shutdoown?
import { makeExecutableSchema } from '@graphql-tools/schema';
import {
	getDirname, dbgWrt, GenObj, cwd, getFilename, slashPath, typeOf,
	//} from "pk-ts-sqlite-lib";
} from "pk-ts-node-lib";



export let port: any = null;

export function getPort(aPort: any = null) {
	if (!port) {
		if (aPort) {
			port = aPort;
		} else {
			port = process.env.PORT || 3000;
		}
	}
	return port;
}

export let defaultRelStaticPath = '../../fe/build'

export let app: any = null;
/** 
 * Implementing API can create a custom app, or default to Express.
 * @param anApp ? Optional Initialize app 
 * @return an app instance - express, NestJS, etc
 */
export function getApp(anApp:any = null) {
	console.log(`In getApp`);
	if (!app) {
		if (anApp) {
			app = anApp;
		}
	} else {

	console.log(`Initializing the app In getApp`);
		app = express();
	}
	return app;
}

/**
 * If false, returns default static path based on current working directory & defaultRelStaticPath
 * If 
 */
export function getStaticPath(apath:any = null) {
	let tstCwd = process.cwd();
	console.log("In getSP:", {cwd, tstCwd});
	if (apath === false) {
		return false;
	}
	if (!apath || (apath === true)) {
		apath = defaultRelStaticPath;
	}
	if (!path.isAbsolute(apath)) {
		apath = slashPath(cwd, apath)
	}
	return apath;
}

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
export async function initApp(opts: GenObj = {}) {
	/*
	if (!app) {
		app = getApp();
	}
	*/
	//let inApp = getApp();
	//let toIA = typeOf(inApp);
	let toIA = 'tst';
	let toA = typeOf(app);
	console.log("In initapp:", { toA, toIA });
	let defaults = {
//		port :  process.env.PORT || 3000,
		killPort: true,
		cors: true,
//		bodyParser: true,
		compression: true,
		json: true,
		urlencoded: true,
		cookieParser: true,
		static: true,
		apiBase:'/api',
	};

	let settings = Object.assign({}, defaults, opts);

	//settings.app = getApp(settings.app);
	if (settings.killPort) {
		await killPort(getPort());
	}

	settings.port = getPort(settings.port);
	console.log(`Thinking port is: [${settings.port}]`);
	let appInitOpts: GenObj = {};

	app = express();
	if (settings.apiBase) {
		let apiBase = settings.apiBase;
		let apiRouter = express.Router();
		apiRouter.get('/', (req, res) => {
			res.json( { this: "root" });
    });

		let apiAuthRouter = express.Router();
		apiAuthRouter.get('/', (req, res) => {
			res.json( { auth: "subauth" });
    });

		apiRouter.use('/auth', apiAuthRouter);

   // app.use(apiBase, apiAuthRouter);
		app.use(apiBase, apiRouter);
		//app = express({ baseUrl: apiBase });
		//app = express({ basepath: apiBase });
		//app.set('base', apiBase);
		console.log(`Trying to use apiBase? Pre...`, apiBase);
		//let apiRouter = express.Router();
		//app.use(settings.apiBase, apiRouter);
		/*
			console.log(`Trying to use apiBase? Pre...`, settings.apiBase);
			app.use(settings.apiBase, async (req, res, next) => {
				console.log(`Trying to use apiBase? ...In`, settings.apiBase);
				next();
			});
			*/
	}
	/*
	else {
		console.log(`Intitalize APP withoug base!!`);
			app = express();
	}
	*/


	app.set('port',settings.port)

	if (settings.cors) {
		app.use(cors());
	}
	if (settings.compression) {
		app.use(compression());
	}

	if (settings.json) {
		app.use(bodyParser.json());
	}

	if (settings.urlencoded) {
		app.use(bodyParser.urlencoded({ extended: true }));
	}

	/**
	 * If not empty - use path for static rendering.
	 * If true, use a default path for the fe. Assumes fe/static path is 
	 * If a string, can be relative or absolute path.
	 */




	//debugging...
	if (settings.static) { // Either true or a string path
		let staticPath  = '';
		if (settings.static === true) { //use default
			staticPath = defaultRelStaticPath;
		} else {
			staticPath = settings.static;
		}
		if (!path.isAbsolute(staticPath)) { // Make absolute path - hmm, might be very tricky to get right base path
			staticPath = slashPath(cwd, staticPath);
		}
		console.log(`We think the static FE path should be: [${staticPath}]`);
		app.use(express.static(staticPath));
	}
	/*
	*/

	/*
	*/

	/*
	*/
	console.log(`Is the port REALLY: [${port}]? Settings are:`, { settings });

	// Have to listen on the port set here like:
	// app.listen(app.get('port'), () => {console.log(`API server listening on port [${app.get('port')}]`)});
	app.listenDefault = () =>   {
		return app.listen(app.get('port'), () => {console.log(`API server listening on port [${app.get('port')}]`)})
	};

	return app;
}


// Create an Express app
//export const app = express();
//const dirName = '.';
//const staticDir = '../../fe/public';
//const dirName = getDirname(import.meta.url);
//const staticDir = slashPath(getDirname(import.meta.url, '../../fe/public'));
//const staticDir = slashPath(dirName, '../../fe/public');

//const port =  process.env.PORT || 3000;
/*
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

*/







