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
const bson_1 = require("bson");
const endpoints_config_1 = __importDefault(require("../../../endpoints.config"));
const connect_1 = require("../../services/connect");
/**
 * Get one experiment by id.
 * @param {Token} Jwt - User's token.
 * @param {ObjectId}  MotherId - Id of the mother.
 * @param {Id}  ParticipantId - Id of the participant.
 * @param {String}  Cam - Cam data.
 */
const getOneExperiment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const idExpToFetch = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
    const participantID = (_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.participantID) !== null && _d !== void 0 ? _d : "";
    if (!bson_1.ObjectId.isValid(idExpToFetch)) {
        return res.status(404).json({ message: "Experiment unknown." });
    }
    // fetch the experiment
    let experiment = yield ((_e = connect_1.collections.experiments) === null || _e === void 0 ? void 0 : _e.findOne({ _id: new bson_1.ObjectId(idExpToFetch) }));
    // return the experiment's data
    const token = (0, jsonwebtoken_1.sign)({
        participantID: participantID,
        motherID: idExpToFetch,
    }, endpoints_config_1.default.KEY_JWT, {
        expiresIn: "4h",
    });
    //return null if the study is not active
    if ((experiment === null || experiment === void 0 ? void 0 : experiment.status) != "active") {
        return res.status(401).json({ message: "This experiment is not active." });
    }
    return res.status(200).json({
        cam: experiment.cam,
        config: experiment.config,
        link: experiment.link,
        token: token,
    });
});
exports.default = getOneExperiment;
