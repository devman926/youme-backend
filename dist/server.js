"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const routes_1 = require("./routes");
const migrate_1 = require("./db/migrate");
const main_1 = require("./controllers/main");
const authController = require("./controllers/auth");
const rootRouter = express.Router();
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(authController.localStrategy);
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res, next) => {
    res.status(200).send({ message: 'Welcome to the beginning of nothingness.' });
    next();
});
migrate_1.default();
app.use((req, res, next) => main_1.default(req, res, next));
routes_1.default(rootRouter);
app.use('/', rootRouter);
const port = process.env.PORT || 3000;
app.set('port', port);
const server = app.listen(port, function () {
    console.log("Server is running on ", port, app.settings.env);
});
server.listen(port);
console.info("Server is running on port: " + port);
