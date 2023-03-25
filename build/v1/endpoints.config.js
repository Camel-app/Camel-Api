"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    KEY_JWT: (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : '',
    PRODUCTION_MODE: (_b = process.env.PRODUCTION_MODE) !== null && _b !== void 0 ? _b : '',
    DB_LINK: (_c = process.env.DB_LINK) !== null && _c !== void 0 ? _c : '',
};
