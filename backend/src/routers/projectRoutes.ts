import { Router } from "express";
import { body, param} from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputError } from "../middleware/validation";

const router = Router()

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param("id").isMongoId().withMessage("ID no valido"),
    handleInputError,
    ProjectController.getProjetcById)

    router.put('/:id',
        param("id").isMongoId().withMessage("ID no valido"),
        body("projectName").notEmpty().withMessage("El nombre del Proyecto es obligatorio"),
        body("clientName").notEmpty().withMessage("El nombre del Clientes es Obligatorio"),
        body("description").notEmpty().withMessage("La descripcion es obligatoria") ,
        handleInputError,
        ProjectController.updateProject)    

router.post("/",
    body("projectName").notEmpty().withMessage("El nombre del Proyecto es obligatorio"),
    body("clientName").notEmpty().withMessage("El nombre del Clientes es Obligatorio"),
    body("description").notEmpty().withMessage("La descripcion es obligatoria") ,
    handleInputError, 
    ProjectController.createProjects)

router.delete('/:id',
        param("id").isMongoId().withMessage("ID no valido"),
        handleInputError,
        ProjectController.deleteById)

export default router 