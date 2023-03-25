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
const endpoints_config_1 = __importDefault(require("../../../endpoints.config"));
const connect_1 = require("../../services/connect");
const bson_1 = require("bson");
/**
 * Get one experiment's data by token.
 * @param {Token} jwt - User's token.
 */
const getOneExperimentToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    //get the token
    const token = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.jwt) !== null && _b !== void 0 ? _b : '';
    let decoded = {};
    try {
        decoded = (0, jsonwebtoken_1.verify)(token, endpoints_config_1.default.KEY_JWT);
    }
    catch (err) {
        return res.status(401).json({ message: "Invalide token" });
    }
    const experimentId = decoded.motherID;
    // connect to the database
    const experimentArray = yield ((_c = connect_1.collections.experiments) === null || _c === void 0 ? void 0 : _c.aggregate([
        { "$match": { "_id": new bson_1.ObjectId(experimentId) } },
        { "$unwind": "$daughters" },
        { "$match": { "daughters.jwt": token } },
        { "$set": { "cam": "$daughters.cam" } },
        { "$project": { "cam": 1 } }
    ]).toArray());
    // No experiment found
    if ((experimentArray === null || experimentArray === void 0 ? void 0 : experimentArray.length) == 0) {
        return res.status(401).json({ message: "No input found" });
    }
    return res.status(200).json({ cam: experimentArray[0].cam });
});
exports.default = getOneExperimentToken;
