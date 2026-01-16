import { Router } from "express";

import HttpResponse from "../utils/httpResponse.js";
import { ticketMeta } from "../utils/ticket.seed.js";

const router = Router();

router.get("/statuses", (req, res) => {
    return HttpResponse.success(res, "Statuses retrieved successfully.", ticketMeta.statuses);
});

router.get("/priorities", (req, res) => {
    return HttpResponse.success(res, "Priorities retrieved successfully.", ticketMeta.priorities);
});

export default router;
