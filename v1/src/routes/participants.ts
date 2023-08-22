import express from 'express';

const router = express.Router();

import getOneExperimentToken from '../controllers/participant/getOneExperimentToken';
import getOneExperiment from '../controllers/participant/getOneExperiment';
import submitExperiment from '../controllers/participant/submitExperiment';

const isAuth = require("../middlewares/auth");

router.get('/getOneExperiment', getOneExperiment);
router.post('/submitExperiment', isAuth, submitExperiment);
router.get('/getOneExperimentToken', getOneExperimentToken);



export default router;