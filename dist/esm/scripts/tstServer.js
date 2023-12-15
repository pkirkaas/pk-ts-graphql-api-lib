/**
 * Testing initialization of API server
 */
import { initApp, } from '../index.js';
let app = await initApp({
    static: 'tstfe',
});
//app.listen();
app.get('/', async (req, res) => {
    console.log("In api root");
    //app.get('/',  (req, res) => {
    //return { this: "root" };
    res.json({ this: "root" });
});
app.get('test', async (req, res) => {
    console.log("In test");
    //app.get('/test',  (req, res) => {
    //return { this: "worked" };
    res.json({ this: "worked again!" });
});
//let lPort = getPort();
//app.listen(lPort, () => {console.log(`API server listening on port ${lPort}`)});
app.listen(app.get('port'), () => { console.log(`API server listening on port [${app.get('port')}]`); });
//let appProps = allProps(app, 'tvp', 8);
//dbgWrt(appProps);
//console.log({ app });
//app.listen();
//# sourceMappingURL=tstServer.js.map