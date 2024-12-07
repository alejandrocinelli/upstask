import type {Request, Response} from 'express'
import Project from '../models/Proyect'
import Task from '../models/Task'

export class TaskController {

    static createTask = async (req : Request, res : Response) => {
        
        const { projectId } = req.params
        
        const project = await Project.findById(projectId)
        if(!project){
            const error = new Error("Proyecto No Encontrado")
            res.status(404).json({error : error.message })
        }
       
        try {
            const task = new Task(req.body)
            task.project = project.id
            project.tasks.push(task)
            
            await task.save()
            await project.save()
            res.send(project)
        } catch (error) {
            console.log(error)
        }
    }
}