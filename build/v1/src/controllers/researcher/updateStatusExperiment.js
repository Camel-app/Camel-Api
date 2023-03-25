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
 * Change the status of one experiment you owned.
 * @param {ObjectId}  MotherId - Id of the experiment to change.
 * @param {Token} jwtToken - Token from the user.
 */
const changeExperimentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const decoded = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.decoded) !== null && _b !== void 0 ? _b : '';
    const newStatus = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.status) !== null && _d !== void 0 ? _d : "inactive";
    const idExperiment = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : '';
    if (["inactive", "active", "completed", "archived"].indexOf(newStatus) === -1) {
        res.status(409).json({
            message: "Chose a valid status from: inactive, active, completed, archived",
        });
        return;
    }
    // check the validity of the id
    if (!bson_1.ObjectId.isValid(idExperiment)) {
        res.status(409).json({ message: "Invalide id" });
        return;
    }
    //Check if exists and break if not
    const experiment = yield ((_g = connect_1.collections.experiments) === null || _g === void 0 ? void 0 : _g.findOne({ _id: new bson_1.ObjectId(String(idExperiment)) }));
    if (!experiment) {
        res.status(409).json({ message: "Invalide experiment" });
        return;
    }
    //update the status of other experiments based on the user's paid value
    const researcher = yield ((_h = connect_1.collections.researchers) === null || _h === void 0 ? void 0 : _h.findOne({ _id: new bson_1.ObjectId(decoded.userId) }));
    if (!researcher) {
        res.status(409).json({ message: "Invalide user account" });
        return;
    }
    //if no a paid user - only one experiment can run at  the time
    if (researcher.paid === false && newStatus === "active") {
        yield ((_j = connect_1.collections.experiments) === null || _j === void 0 ? void 0 : _j.updateMany({
            researcherID: new bson_1.ObjectId(decoded.userId),
            status: "active",
        }, { "$set": { status: "inactive" } }));
    }
    //update the status
    const resultId = yield ((_k = connect_1.collections.experiments) === null || _k === void 0 ? void 0 : _k.updateOne({ _id: new bson_1.ObjectId(idExperiment) }, { "$set": { status: newStatus } }));
    res.status(201).json({ message: `Status changed - ${idExperiment} is now ${newStatus}` });
    return;
});
exports.default = changeExperimentStatus;
