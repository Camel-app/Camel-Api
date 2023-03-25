"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const endpoints_config_1 = __importDefault(require("../../endpoints.config"));
module.exports = (req, res, next) => {
    var _a;
    (0, jsonwebtoken_1.verify)((_a = req.body) === null || _a === void 0 ? void 0 : _a.jwt, endpoints_config_1.default.KEY_JWT, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err && decoded) {
            req.body.decoded = decoded;
            next();
        }
        else {
            res.status(401).json({ message: "You are not authenticated." });
        }
    }));
};
