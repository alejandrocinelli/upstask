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

    static getTaskById = async (req : Request, res : Response) => {
        
        
        try {
            const {taskId} = req.params 
            const task = await Task.findById(taskId)
            
            if(!task){
                const error = new Error("tarea no encontrada")
                 res.status(404).json({error : error.message})
                 return
            }
            // el tostring sino lo pone como objet
            if(task.project.toString()!== req.project.id ){
                const error = new Error("Peticion no correcta")
                res.status(400).json({error : error.message})
                return
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({error : error.message })
        }
    
    }

    static upDateTask = async (req : Request, res : Response) => {

        try {
            
            const {taskId} = req.params 
            const task = await Task.findById(taskId )
            
            if(!task){
                const error = new Error("tarea no encontrada")
                 res.status(404).json({error : error.message})
                 return
            }
            // el tostring sino lo pone como objet
            if(task.project.toString()!== req.project.id ){
                const error = new Error("Peticion no correcta")
                res.status(400).json({error : error.message})
                return
            }

            task.name = req.body.name 
            task.description = req.body.description
            await task.save()
            res.send("Tarea Actualizada Correctamente")

        } catch (error) {
            res.status(500).json({error : error.message })
        }
    }

    static deleteTask = async (req : Request, res : Response) => {

        try {
            
            const {taskId} = req.params 
            const task = await Task.findById(taskId )
            
            if(!task){
                const error = new Error("tarea no encontrada")
                 res.status(404).json({error : error.message})
                 return
            }
            // el tostring sino lo pone como objet
           
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== taskId)
            await Promise.allSettled([task.deleteOne(),req.project.save()])
            res.send("Tarea eliminada Correctamente")

        } catch (error) {
            res.status(500).json({error : error.message })
        }
    }

   }
 