import { Router } from "express";
import { body, param} from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputError } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validProjetExist } from "../middleware/project";

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


// routes for tasks 
router.param('projectId', validProjetExist)

/* router.param`:
 * - Middleware que se ejecuta automáticamente cuando se encuentra un parámetro `projectId` en la ruta.
* - Valida si el proyecto existe utilizando la función `validProjetExist`.*/

router.post('/:projectId/tasks', 
    
    body("name").notEmpty().withMessage("El nombre de la tarea es obligatoria"),
    body("description").notEmpty().withMessage("Descripcion es Obligatorio"),
    handleInputError,
    TaskController.createTask
)

router.get('/:projectId/tasks', 
    TaskController.getProjectTask
)

router.get('/:projectId/tasks/:taskId', 
    param("taskId").isMongoId().withMessage("ID no valido"),
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId', 
    param("taskId").isMongoId().withMessage("ID no valido"),
    body("name").notEmpty().withMessage("El nombre de la tarea es obligatoria"),
    body("description").notEmpty().withMessage("Descripcion es Obligatorio"),
    handleInputError,
    TaskController.upDateTask
)

router.delete('/:projectId/tasks/:taskId', 
    param("taskId").isMongoId().withMessage("ID no valido"),
    TaskController.deleteTask
)

export default router 