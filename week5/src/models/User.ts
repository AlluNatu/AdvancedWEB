import mongoose, { Document, Schema } from "mongoose";

interface ITodo {
    todo: string
    checked:boolean
}

interface IUser extends Document {
    name: string,
    todos: ITodo[]
}

let todoSchema: Schema = new Schema({
    todo: {type: String, required: false},
    checked: {type: Boolean, default : false}
})

let userSchema: Schema = new Schema({
    name: {type: String, required: true},
    todos: {type: [todoSchema], required: false}
})

const Users: mongoose.Model<IUser> = mongoose.model<IUser>("Users", userSchema)

export {Users, IUser, ITodo}