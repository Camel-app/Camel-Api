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
 * Delete one experiment you owned.
 * @param {ObjectId}  Id - Id of the experiment to delete.
 * @param {Token} jwtToken - Token from the user.
 */
const deleteExperiment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const userId = (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.decoded) === null || _b === void 0 ? void 0 : _b.userId) !== null && _c !== void 0 ? _c : '';
    const id = (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : '';
    if (!bson_1.ObjectId.isValid(id) || !bson_1.ObjectId.isValid(userId)) {
        res.status(409).json({ message: "Invalid id." });
        return;
    }
    //Check if exists and break if not
    const experiment = yield ((_f = connect_1.collections.experiments) === null || _f === void 0 ? void 0 : _f.findOne({ _id: new bson_1.ObjectId(id), researcherID: new bson_1.ObjectId(userId) }));
    if (!experiment) {
        res.status(404).json({ message: "This experiment does not exist." });
        return;
    }
    //update the status
    yield ((_g = connect_1.collections.experiments) === null || _g === void 0 ? void 0 : _g.deleteOne({ _id: new bson_1.ObjectId(id), researcherID: new bson_1.ObjectId(userId) }));
    res.status(200).json({ message: "Experiment has been deleted." });
    return;
});
exports.default = deleteExperiment;
