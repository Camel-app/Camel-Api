"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const endpoints_config_1 = __importDefault(require("../../../endpoints.config"));
const connect_1 = require("../../services/connect");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const email = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : null;
    const password = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.password) !== null && _d !== void 0 ? _d : null;
    const user = yield ((_e = connect_1.collections.researchers) === null || _e === void 0 ? void 0 : _e.findOne({ email: email }));
    if (!user || !password) {
        res.status(401)
            .json({ message: "Authentification fail", token: "" });
        return;
    }
    const pwdUser = (_f = user === null || user === void 0 ? void 0 : user.password) !== null && _f !== void 0 ? _f : "none";
    bcrypt.compare(password, pwdUser, (err, result) => {
        if (err) {
            res.status(401)
                .json({
                message: "Authentification fail",
                token: "",
            });
            return;
        }
        if (result) {
            const token = (0, jsonwebtoken_1.sign)({
                userId: user._id,
                email: user.email,
                role: user.role,
            }, endpoints_config_1.default.KEY_JWT, {
                expiresIn: "6h",
            });
            res.status(201).json({
                message: "Authentification successful",
                token,
            });
            return;
        }
        res.status(401).json({ message: "Authentification fail", token: "" });
        return;
    });
});
exports.default = login;
