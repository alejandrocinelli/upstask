import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const router = Router()

router.get('/', ProjectController.getAllProjects)
router.post("/", ProjectController.createProjects)

export default router 