const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
const Helpers = require("./helpers");
const config = require("./../config");
const methodOverride = require("method-override");
const GPSData = require("./../app/models/gpsModel");
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());
const rememberLogin = require("./../app/http/middleware/rememberLogin");


module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
    this.setSocket();
  }

  setupExpress() {
    server.listen(config.port, () => console.log(`Listening on port ${config.port}`));
  }

  async setMongoConnection() {
    mongoose.connect("mongodb://localhost/admin");
    mongoose.set("useFindAndModify", false);
  }

  setConfig() {
    require("./passport/passport-local");
    app.use(express.static(config.layout.public_dir));
    app.set("view engine", config.layout.view_engine);
    app.set("views", config.layout.view_dir);
    app.use(config.layout.ejs.expressLayouts);
    app.set("layout extractScripts", config.layout.ejs.extractScripts);
    app.set("layout extractStyles", config.layout.ejs.extractStyles);
    app.set("layout", config.layout.ejs.master);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(validator());
    app.use(
      session({
        secret: "aaaa",
        name: "aaaa",
        resave: true,
        saveUninitialized: true,
        cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 6) },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
    );
    app.use(cookieParser("aaaa"));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(rememberLogin.handle);

    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  setRouters() {
    app.use(require("./routes/web"));
  }

  setSocket() {
    const io = require("socket.io")(server, {
        origin: "*", // اجازه اتصال از هر دامنه‌ای
        methods: ["GET", "POST"], // مشخص کردن متدهای مجاز
        allowedHeaders: ["Content-Type"], // اضافه کردن هدرهای مجاز }, // اجازه اتصال از هر دامنه‌ای
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // ارسال داده‌های GPS هر 5 ثانیه
        setInterval(async () => {
            try {
                const gpsData = await GPSData.find().sort({ timestamp: -1 }).limit(1); // دریافت آخرین داده GPS
                if (gpsData.length > 0) {
                    socket.emit("new-gps-data", gpsData[0]); // ارسال آخرین داده به کلاینت
                    console.log("Sent GPS data:", gpsData[0]);
                } else {
                    console.log("No GPS data available");
                }
            } catch (error) {
                console.error("Error fetching GPS data:", error);
            }
        }, 5000);
    });
}
};
