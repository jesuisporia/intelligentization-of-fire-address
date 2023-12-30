const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const config = require('./../config')
var methodOverride  = require("method-override");
// const { ReplSet } = require('mongodb-topology-manager');
const Map = require('./models/map')
const MongoClient = require('mongodb');

// var socket = http.createServer(app);
const server = http.createServer(app);

var io = require('socket.io')(server);


io.on('connection', async (socket) => {
    
    console.log('hhhhhhhhhhhhhooooooooooooomeeeeeeeeeeeeee');

    // Map.watch().
    // on('change', data => console.log(new Date(), data));
    // await Map.find().sort({createdAt: -1}).limit(20).then(req =>{
    //     console.log('aaaaaaaaaaaaaaaaaaaaa')
    //     socket.emit('temp', {temp: req});
    // })

});
const rememberLogin = require('./../app/http/middleware/rememberLogin');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        server.listen(config.port , () => console.log(`Listening on port ${config.port}`));
    }

    async setMongoConnection() {

        // let mongoURI =  "mongodb+srv://fire:IBLWPUIbdrd8W5FI@cluster0.jhfxv.mongodb.net/fire?retryWrites=true&w=majority" 

        // mongoose .connect(mongoURI) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

        // // mongodb://fire:<password>@cluster0-shard-00-00.jhfxv.mongodb.net:27017,cluster0-shard-00-01.jhfxv.mongodb.net:27017,cluster0-shard-00-02.jhfxv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5dmuep-shard-0&authSource=admin&retryWrites=true&w=majority
        // mongoose.connect('mongodb+srv://fire:IBLWPUIbdrd8W5FI@cluster0.jhfxv.mongodb.net/fire?retryWrites=true&w=majority');
        
        mongoose.connect('mongodb://localhost/admin');
        mongoose.set('useFindAndModify', true);
        // mongoose.set('useNewUrlParser', true);
        
        // mongoose.set('useUnifiedTopology', true);

    }

    /**
     * Express Config
     */
    setConfig() {
        require('./passport/passport-local');
        
        // require('./passport/passport-google');
 
        app.use(express.static(config.layout.public_dir));
        app.set('view engine', config.layout.view_engine);
        app.set('views' , config.layout.view_dir);
        app.use(config.layout.ejs.expressLayouts);
        app.set("layout extractScripts", config.layout.ejs.extractScripts);
        app.set("layout extractStyles", config.layout.ejs.extractStyles);
        app.set("layout" , config.layout.ejs.master);


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(methodOverride('_method'));
        app.use(validator());
        // app.use(session("mysecretkey"));
        app.use(session({
            secret: 'aaaa',
            name: 'aaaa',
            resave : true,
            saveUninitialized : true,
            cookie : {  expires : new Date(Date.now() + 1000 * 60 * 60 * 6)},
            store : new MongoStore({ mongooseConnection : mongoose.connection })
        }));
        app.use(cookieParser("aaaa"));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);

        app.use((req , res , next) => {
            app.locals = new Helpers(req, res).getObjects();
            app.locals.io = io

            next();
        });



    }

    setRouters() {

        app.use(require('./routes/web'));        
    }
}