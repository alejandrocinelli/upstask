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
        
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
            
        }

    }

    static getProjetcById = async (req : Request , res : Response) => {
        const { id } = req.params
       
        try {
            const project = await Project.findById(id)

            if(!project){
                const error = new Error("Proyecto No Encontrado")
                res.status(404).json({error : error.message })
            }

            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }
    
    static updateProject = async (req : Request , res : Response) => {
        const { id } = req.params
        const body = req.body
       
        try {
            const project = await Project.findByIdAndUpdate(id , body)

            if(!project){
                const error = new Error("Proyecto No Encontrado")
                res.status(404).json({error : error.message })
            }

            await project.save()
            res.send("Poryecto Actualizado"  )
           
        } catch (error) {
            console.log(error)
        }
    }

    static deleteById = async (req : Request , res : Response) => {
        const { id } = req.params
       
        try {
            const project = await Project.findByIdAndDelete(id)

            if(!project){
                const error = new Error("Proyecto No Encontrado")
                res.status(404).json({error : error.message })
            }

            res.send("Proyecto Eliminado")
        } catch (error) {
            console.log(error)
        }
    } 
}
