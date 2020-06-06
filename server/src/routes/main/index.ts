import express from "express";
const router = express.Router();
import MainController from "./main";
import { passport } from "../../index";

router.get("/events", MainController.getEvents);
router.post("/event", MainController.addEvent);
router.post("/buyTicket", MainController.buyTicket);
router.post("/trackView", MainController.trackView);

export default router;
