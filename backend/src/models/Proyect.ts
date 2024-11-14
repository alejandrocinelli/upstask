import mongoose, {Schema , Document} from "mongoose";

export type ProyectType = Document & {
    projectName : string,
    clientName : string,
    description : string
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
    }
})

const Project = mongoose.model<ProyectType>('Project', ProjectSchema)

export default Project 