import express from "express";
import controller from "../controllers/testcaseController";

const router = express.Router();
router.get("/:id/medical", controller.getTestcaseHistoryById);
router.get("/:id", controller.getTestcaseById);
router.get("/", controller.getTestcaseNames);

export default router;
