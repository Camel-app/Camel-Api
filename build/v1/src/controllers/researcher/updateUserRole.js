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
const connect_1 = require("../../services/connect");
/**
 * Change the role of one User.
 * @param {String}  Email - Email of the user to change.
 * @param {Boolean} NewStatus - New status.
 * @param {Token} jwtToken - Token from the user.
 */
const changeUserRoleStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const newRole = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : "researcher";
        const emailUser = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.email) !== null && _d !== void 0 ? _d : '';
        if (["assistant", "researcher", "admin"].indexOf(newRole) === -1) {
            res.status(409).json({
                message: "Chose a valid status from: assistant or researcher.",
            });
            return;
        }
        const researcher = yield ((_e = connect_1.collections.researchers) === null || _e === void 0 ? void 0 : _e.findOne({ email: emailUser }));
        if (!researcher) {
            res.status(409).json({ message: "Invalide user account" });
            return;
        }
        yield ((_f = connect_1.collections.researchers) === null || _f === void 0 ? void 0 : _f.updateOne({
            email: emailUser,
        }, { "$set": { "role": newRole } }));
        res.status(201).json({ message: `Status changed - ${emailUser}'s role status is now ${newRole}` });
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
    return;
});
exports.default = changeUserRoleStatus;
