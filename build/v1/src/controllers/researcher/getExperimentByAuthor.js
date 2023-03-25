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
 * Get all experiments by author.
 * @param {Token} Jwt - User's token.
 * @param {ObjectId} AuthorId - Id of the author.
 */
const getExperimentByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.decoded) === null || _b === void 0 ? void 0 : _b.userId) !== null && _c !== void 0 ? _c : '';
    let experiments = yield ((_d = connect_1.collections.experiments) === null || _d === void 0 ? void 0 : _d.aggregate([
        { "$match": { researcherID: new bson_1.ObjectId(userId) } },
        { "$set": { numberCams: { "$size": "$daughters" } } },
        { "$project": { daughters: 0, researcherID: 0 } }
    ]).toArray());
    res.status(200).json({ experiments });
    return;
});
exports.default = getExperimentByAuthor;
