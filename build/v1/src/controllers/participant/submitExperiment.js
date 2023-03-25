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
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const connect_1 = require("../../services/connect");
/**
 * Add one experiment by participant.
 * @param {Token} jwt - User's token.
 * @param {ObjectId}  MotherId - Id of the mother.
 * @param {String}  Cam - Cam data.
 */
const submitExperiment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    //get the participant's token
    const cam = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.cam) !== null && _b !== void 0 ? _b : "";
    const token = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.jwt) !== null && _d !== void 0 ? _d : "";
    const idMother = (_g = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.decoded) === null || _f === void 0 ? void 0 : _f.motherID) !== null && _g !== void 0 ? _g : "";
    const participantID = (_k = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.decoded) === null || _j === void 0 ? void 0 : _j.participantID) !== null && _k !== void 0 ? _k : "";
    if (!cam || !idMother || !participantID || !token) {
        return res.status(404).json({ message: "Please submit a correct input." });
    }
    // check the validity of the id
    if (!bson_1.ObjectId.isValid(idMother)) {
        return res.status(409).json({ message: "Invalid id" });
    }
    const existParticipant = yield ((_l = connect_1.collections.participants) === null || _l === void 0 ? void 0 : _l.findOne({
        participantID: participantID,
        idMother: new bson_1.ObjectId(idMother),
    }));
    if (existParticipant) {
        return res.status(401).json({ message: "Participation already done." });
    }
    //Checks if mother exist and breaks if not
    const experimentMother = (_m = connect_1.collections.experiments) === null || _m === void 0 ? void 0 : _m.findOne({ _id: new bson_1.ObjectId(idMother) });
    if (!experimentMother) {
        return res.status(404).json({ message: "The study cannot be found." });
    }
    //Insert the daughter's data into the mother's experiment
    const daughter = {
        participantID: participantID,
        jwt: token,
        creationDate: new Date(),
        cam: JSON.stringify(cam),
    };
    (_o = connect_1.collections.experiments) === null || _o === void 0 ? void 0 : _o.updateOne({ _id: new bson_1.ObjectId(idMother) }, { "$push": { daughters: daughter } });
    const participant = {
        participantID: participantID,
        idMother: new bson_1.ObjectId(idMother),
    };
    // Add participant to participants' list
    yield ((_p = connect_1.collections.participants) === null || _p === void 0 ? void 0 : _p.insertOne(participant));
    return res.status(201).json({ message: "Daughter successfully added." });
});
exports.default = submitExperiment;
