import type {Request, Response} from 'express'
import Project from '../models/Proyect'

export class ProjectController {

static createProjects = async (req : Request, res : Response) => {
    
    const project = new Project(req.body)

    try {
        await project.save()
        res.send("Project creado OK")
    } catch (error) {
        console.log(error)
    }

   
    }

    static getAllProjects = async (req : Request, res : Response) => {
            res.send("todo los porectos")
    }

    
}
