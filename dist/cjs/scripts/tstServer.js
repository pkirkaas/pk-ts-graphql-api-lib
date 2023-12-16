/**
 * Testing initialization of API server
 */
import { enhanceApp, } from '../index.js';
let app = enhanceApp();
;
/*
let app = await initApp({
    static: 'tstfe',

});
*/
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
app.someVal = 123;
app.showVal = () => {
    //@ts-ignore 
    let asv = this.someVal;
    console.log(`in app showval:`, asv);
};
//app.port = 7774;
//app.set('port', 9128);
/*
app.listenPort = () => {
    //@ts-ignore
    //let lport = this.port;
    let lport = this.get('port');
    //@ts-ignore
    return this.listen(lport, () => { console.log(`API server self listening on port [${lport}]`) });
}
*/
/*
app.listenPort = function() {
    //@ts-ignore
    let lport = this.port;
    //let lport = this.get('port');
    //@ts-ignore
    return this.listen(lport, () => { console.log(`API server self listening on port [${lport}]`) });
}

console.log('asv',{asv:app.someVal});
*/
app.listenPort();
//app.listen(lPort, () => {console.log(`API server listening on port ${lPort}`)});
//app.listen(app.get('port'), () => {console.log(`API server listening on port [${app.get('port')}]`)});
//let appProps = allProps(app, 'tvp', 8);
//dbgWrt(appProps);
//console.log({ app });
//app.listen();
//# sourceMappingURL=tstServer.js.map