import type {Request, Response} from 'express'

export class TaskController {

    static createTask = async (req : Request, res : Response) => {
        
        const { projectId } = req.params
        console.log(projectId) 
        try {
           
            res.send("Project creado OK")
        } catch (error) {
            console.log(error)
        }
    }
}