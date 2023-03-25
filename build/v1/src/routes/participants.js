"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getOneExperimentToken_1 = __importDefault(require("../controllers/participant/getOneExperimentToken"));
const getOneExperiment_1 = __importDefault(require("../controllers/participant/getOneExperiment"));
const submitExperiment_1 = __importDefault(require("../controllers/participant/submitExperiment"));
const isAuth = require("../middlewares/auth");
router.get('/getOneExperiment', getOneExperiment_1.default);
router.post('/addExperience', isAuth, submitExperiment_1.default);
router.get('/getOneExperimentToken', getOneExperimentToken_1.default);
exports.default = router;
