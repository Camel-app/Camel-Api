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
const bson_1 = require("bson");
/**
 * Add an experiment.
 * @param {Token} jwt - User's token.
 * @param {Json} Cam - Cam model.
 * @param {String} Name - Name of the experiment.
 */
const addExperiment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const decoded = (_a = req.body) === null || _a === void 0 ? void 0 : _a.decoded;
    const name = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '';
    const link = (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.link) !== null && _e !== void 0 ? _e : '';
    const camFileRaw = (_g = (_f = req.body) === null || _f === void 0 ? void 0 : _f.cam) !== null && _g !== void 0 ? _g : '';
    const camFile = JSON.parse(camFileRaw);
    const cam = (_h = camFile === null || camFile === void 0 ? void 0 : camFile.CAM) !== null && _h !== void 0 ? _h : '';
    const configcam = (_j = camFile === null || camFile === void 0 ? void 0 : camFile.config) !== null && _j !== void 0 ? _j : '';
    if (!name || !cam || !configcam || !link) {
        res.status(401).json({ message: "Invalid content" });
        return;
    }
    try {
        const experiment = {
            name: name,
            researcherID: new bson_1.ObjectId(decoded.userId),
            creationDate: new Date(),
            config: JSON.stringify(configcam),
            cam: JSON.stringify(cam),
            link: link,
            status: "inactive",
            daughters: [],
        };
        const result = yield ((_k = connect_1.collections.experiments) === null || _k === void 0 ? void 0 : _k.insertOne(experiment));
        result
            ? res.status(201).send({ message: `Experiment added successfully ${result.insertedId}` })
            : res.status(500).send({ message: "Failed to create a new experiment." });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
    return;
});
exports.default = addExperiment;
