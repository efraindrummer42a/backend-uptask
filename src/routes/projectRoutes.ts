import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.post('/', 
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.createProject,
)
router.get('/', ProjectController.getAllProject)


export default router