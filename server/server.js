const auth = require("json-server-auth"); //🔥 npm i // auth ta lagbe .. // eta ekta middleware er moto
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

global.io = io;

const router = jsonServer.router("db.json");

// response middleware
router.render = (req, res) => {
    const path = req.path;
    const method = req.method;

    if (
        path.includes("/conversations") &&
        (method === "POST" || method === "PATCH")
    ) {
        // emit socket event
        io.emit("conversation", {
            data: res.locals.data,
        });
    }

    res.json(res.locals.data);
};

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;

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

app.use(rules); // prottek ta route ei rules er moddhe diye ghure ashse ..
app.use(auth);
app.use(router);

server.listen(port);
// 🔥ultimately ami jinish ta ke full up and running korechi .. documentation dekhe ..
// 🔥 amra shudhu janbo je .. kon kon route e hit korle amra ki ki pai

/**
 * amader API ready ase .. amra ekhon redux toolkit er maddhome request kore kore data dekhabo and
 */
