// json server er server creation process ta bad diye amra express er server creation process e gelam ..
// ekhon amra socket.io implement korar jonno ready
const auth = require("json-server-auth"); //🔥 npm i // auth ta lagbe .. // eta ekta middleware er moto
const jsonServer = require("json-server");
const express = require("express"); // npm i express socket.io
// uninstall korte chaile .. npm uninstall express socket.io
const http = require("http");

const app = express(); // app ta banalam
// const server = jsonServer.create(); // eta use kore amra amader server baniyechilam
// but eta tar moto kore she baniyeche ..but socket ke kaj korate hole .. ekta http server hote hobe .. er jonno amader ke
// node js er http module ke use korte hobe .. amra express js ekhane use korbo ..
const server = http.createServer(app); // create server korar time e amader ke ekta app reference dite hoy
const io = require("socket.io")(server); // socket er duita kaj... shob kichu send kora and listen kora

// io .on diye event listen korte pare ..
// io.emit server e event emit korte chaile ..

global.io = io; // 😀 browser e jerokom window thake .. node js e hocche global // shob jaygay jeno io ke access korte pari ..

const router = jsonServer.router("db.json");
/**
 * Discord ....................................................................................................................
 * mane request er moddhe boshe amra request ta shesh houar age , response deowar age .. amra kichu kaj karbar korte pari .. abar
 * ek e vabe response middleware o kintu ase .. response jokhon finally server dey ... shei response ta deowar shomoy o finally
 * ekta middleware er moddhe diye ghuriye niye ashte pari amra ..  and shei khan e boshe amra dekhte pari .. ki response dite
 * jacche ... and shei request er property gula ki .. shekhan theke jodi amra some how check kore nite partam
 * je .. jodi amar request er URL ta "/conversations" mane jeta EDIT AND ADD ..  and method ta kodi POST and PATCH hoy ... tahole
 * kintu amra bujhte partam je... conversation edit hoyeche .. arki ..
 * so amra ashole response er moddhe amra intercept korbo ..
 * kivabe ?
 * shetar jonno response likhe json-server er github e search dile .. custom output example nam e ekta concept dekha jabe .. final
 * jei response ta jacche .. sheta ke modify korte chaile .. ami tomake router.render function diye dicchi .. tumi er moddhe kaj ta
 * kore felte paro .. tar mane shobar shesh e .. amader server diye jokhon kono kichu jabe .. tokhon final jei response ta ..
 * sheta (req, res) er moddhe diye dey ..
 */

// response middleware
router.render = (req, res) => {
    // jekono response etar moddhe diye ghure jabe .. tar mane ekhane shob parameter check korte parbo .. amader jeta dorkar
    // request jeta jacche .. shei request er ..
    const path = req.path;
    const method = req.method;

    if (
        path.includes("/conversations") &&
        (method === "POST" || method === "PATCH")
    ) {
        // emit socket event
        io.emit("conversation", {
            data: res.locals.data, //ekhane shob data she diye dey..response e jei data she dite jacche..shei data she diye dey
        });
    }

    res.json(res.locals.data); // ami body er moddhe na pathiye .. direct pathiye dilam ..
};

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
// server.db = router.db;
app.db = router.db;
// server.use(middlewares);
app.use(middlewares);

const rules = auth.rewriter({
    //🔥rules er moddhe amar kichu rules define kore diyechi // rule object ta ultimately hobe ekta middleware
    users: 640, // users jei route ta ase .. shekhan e ekta permission diyechi ..
    // jara linus use koren .. ba file folder system er permission jani .. shei rokom arki.. first digit ta hocche ei resource
    // er jini owner ..manse users table e oi object tar jini owner ..
    conversations: 660, // 6 - owner er permission .. read write .. shob permission ase ..
    // 4 -> Logged in user er permission .. logged in user shudhu read korte parbe .. write korte parbe na ..
    // karon amader users table e search korte hobe ..jokhon conversation create korbo .. tokhon oi conversation er user .. amar
    // oi list e ase kina .. sheta check korte hobe .
    // 0 -> 0 mane hocche public er jonno permission .. public kichui korte parbe na
    messages: 660,
});

// server.use(rules);
// server.use(auth);
// server.use(router);

app.use(rules); // prottek ta route ei rules er moddhe diye ghure ashse ..
app.use(auth); // whole server na .. oi app use korbe ..
app.use(router);

server.listen(port);
// 🔥ultimately ami jinish ta ke full up and running korechi .. documentation dekhe ..
// 🔥 amra shudhu janbo je .. kon kon route e hit korle amra ki ki pai

/**
 * amader API ready ase .. amra ekhon redux toolkit er maddhome request kore kore data dekhabo and
 */

/**
 * amra amader server e socket ta setup korbo
 * amra JSON server use korchi .. er onek limitation ase ..
 * jei vabe amra JSON server er setup korechi .. ei vabe set up rakhle .. socket niye kaj kora jabe na ..
 * so she jonnno eta ke express server e ,, ekta standard http server e convert korte hobe ..  and amader server e
 * server.js nam e ekta file ase ..
 * ei khan e amra jeta korechi
 */
