/**
 * Testing initialization of API server
 */


import {
	 runCli, typeOf, jsonClone, cwd, dbgWrt, allProps,
} from 'pk-ts-node-lib';

import {
	getApp, getPort, initApp, getStaticPath,
} from '../index.js';

let app = await initApp({
	static: 'tstfe',

});

//app.listen();

app.get('/', async (req, res) => {
//app.get('/',  (req, res) => {
	//return { this: "root" };
	res.json( { this: "root" });
});

app.get('/test', async (req, res) => {
//app.get('/test',  (req, res) => {
	//return { this: "worked" };
	res.json( { this: "worked again!" });
});

let lPort = getPort();

app.listen(lPort, () => {console.log(`API server listening on port ${lPort}`)});
//app.listen();

//let appProps = allProps(app, 'tvp', 8);

//dbgWrt(appProps);

//console.log({ app });

//app.listen();