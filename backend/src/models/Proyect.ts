import mongoose, {Schema , Document , PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";

// el populatedDOc similar al join de sql para relacionar dos modelos, en este caso tasks tiene que ser de tipo ITASK
// tasks es un arreglo de tareas 

export type ProyectType = Document & {
    projectName : string,
    clientName : string,
    description : string,
    tasks : PopulatedDoc<ITask & Document >[] 
}

// defino el modelo 

const ProjectSchema : Schema = new Schema({
    projectName : {
        type : String,
        require : true,
        trim : true
    },

    clientName : {
        type : String,
        require : true,
        trim : true
    },
    description : {
        type : String,
        require : true,
        trim : true
    },

    tasks : [
        {
            type : Types.ObjectId,
            ref : "Task"
        }
    ]
}, {timestamps : true})

const Project = mongoose.model<ProyectType>('Project', ProjectSchema)

export default Project 