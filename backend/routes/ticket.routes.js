import { Router } from "express";

import TicketController from "../controllers/ticket.controller.js";

const router = Router();

// get all
router.get('/', TicketController.getAll);
// create
router.post('/', TicketController.create);
// update
router.patch('/:id', TicketController.update);

export default router;