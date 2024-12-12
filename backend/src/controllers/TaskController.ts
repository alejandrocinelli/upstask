import type {Request, Response} from 'express'

import Task from '../models/Task'

export class TaskController {

    static createTask = async (req : Request, res : Response) => {
        
       
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task)
            
            // Usamos Promise.allSettled para manejar múltiples operaciones asíncronas 
            // (guardar la tarea y actualizar el proyecto) de forma paralela, sin detener la ejecución
            // en caso de que alguna falle. Esto asegura que ambos procesos intenten completarse.
           await Promise.allSettled([task.save(), req.project.save()])
            res.send("Tarea Creada correctamente")  
           
            
        } catch (error) {
            res.status(500).json({error : error.message })
        }
    }

    static getProjectTask = async (req : Request, res : Response) => {
    
        try {
            const tasks = await Task.find({project: req.project.id}).populate("project")
            // aca estamos haciendo tipo un join para relacionar con el modelo project
            res.json(tasks)
        } catch (error) {
            res.status(500).json({error : error.message })
        }
    
    }
   }
 