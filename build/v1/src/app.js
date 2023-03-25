"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const connect_1 = require("./services/connect");
const participants_1 = __importDefault(require("./routes/participants"));
const researchers_1 = __importDefault(require("./routes/researchers"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
(0, connect_1.connectToDatabase)();
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((_req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    //if (req.method === 'OPTIONS') {
    //    res.header('Access-Control-Allow-Methods', 'GET POST');
    //    return res.status(200).json({});
    //}
    next();
});
/** Routes */
app.use("/participants", participants_1.default);
app.use("/researchers", researchers_1.default);
/** Error handling */
app.use((_req, res) => {
    return res.status(404).json({
        message: "invalid request"
    });
});
module.exports = app;
