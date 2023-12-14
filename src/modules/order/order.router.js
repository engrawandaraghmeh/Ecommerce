import { Router } from "express";
import * as OrderContoller from './order.controller.js';
import { endpoint } from "./order.endpoint.js";
//import * as validator from './order.valodation.js';
import {validation} from '../../middleware/validation.js';
import {auth} from '../../middleware/auth.js'
const router=Router();


router.post('/',auth(endpoint.create),OrderContoller.CreateOrder)



export default router;