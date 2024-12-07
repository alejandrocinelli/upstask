import type {Request, Response , NextFunction } from "express"
import Project, { Iproject } from "../models/Proyect"

/* 
Declaramos una extensión global del objeto Request de Express para incluir una nueva propiedad `project`, 
que sigue la interfaz definida en `Iproject`. Esto nos permite agregar la información del proyecto encontrado 
al request y hacerlo accesible en middleware o rutas posteriores, manteniendo un tipado fuerte con TypeScript.
*/
declare global {
    namespace Express {
        interface Request {
            project : Iproject 
        }
    }
}

export async function validProjetExist(req : Request , res : Response  , next : NextFunction) {
    
    try {
        const { projectId } = req.params
        
        const project = await Project.findById(projectId)
        if(!project){
            const error = new Error("Proyecto No Encontrado")
            res.status(404).json({error : error.message })
        }
        req.project = project 
        next()
    } catch (error) {
        res.status(500).json({error : "Error"})
    }
}