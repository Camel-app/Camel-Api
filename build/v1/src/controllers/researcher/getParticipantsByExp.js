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
 * Get all participants' data linked to one experiment you owned.
 * @param {ObjectId}  MotherId - Id of the experiment to fetch.
 * @param {Token} jwtToken - Token from the user.
 * @returns {Array} Array with participants' data.
 */
const getParticipantsByExp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const decoded = (_a = req.body) === null || _a === void 0 ? void 0 : _a.decoded;
    const userId = new bson_1.ObjectId(decoded.userId);
    const motherID = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.id) || '';
    if (!bson_1.ObjectId.isValid(motherID)) {
        res.json({ participants: ["Invalide mother id"] });
        return;
    }
    let daughters = (yield ((_c = connect_1.collections.experiments) === null || _c === void 0 ? void 0 : _c.findOne({ _id: new bson_1.ObjectId(motherID), researcherID: new bson_1.ObjectId(userId) })));
    res.status(200).json(daughters);
    return;
});
exports.default = getParticipantsByExp;
