import express from "express";
import * as controller from "../controllers/scheduleController";

const router = express.Router();

router.get("/groups/:name/antigens", controller.getAntigensByGroup);
router.get("/groups/:name", controller.getVaccineGroupByName);
router.get("/groups", controller.getVaccineGroupNames);
router.get("/:cvx/antigens", controller.getAntigensByVaccineId);
router.get("/:cvx/conflicts", controller.getConflictsById);
router.get("/:cvx", controller.getVaccineById);
router.get("/", controller.getVaccineNames);

export default router;
