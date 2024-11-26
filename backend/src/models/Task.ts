import mongoose, {Schema , Document, Types} from "mongoose";

const taskStatus = {
    PENDING : "pending",
    ON_HOLD : "onHold",
    IN_PROGRESS : "inProgress" ,
    UNDER_REVIEW : "underReview",
    COMPLETED : "completed"
} as const 

// Este tipo solo puede tomar como valores las claves del objeto `taskStatus`. 
// Define los estados permitidos para una tarea, asegurando que cualquier valor de estado 
// asignado a `TaskStatus` esté restringido a los definidos en `taskStatus`.

export type TaskStatus = typeof taskStatus [keyof typeof taskStatus]
 
export interface ITask extends Document  {
    name : string,
    description : string,
    project : Types.ObjectId,
    status : TaskStatus
}

const TaskSchema : Schema = new Schema({
    name : {
        type : String,
        require : true,
        trim : true
    },
    description : {
        type : String,
        require : true,
        trim : true
    },
    project :{
      type : Types.ObjectId,
      ref : "Project"
    },
    
    status : {
        type : String ,
        enum : Object.values(taskStatus),
        default : taskStatus.PENDING
    }

}, {timestamps : true})

const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task 