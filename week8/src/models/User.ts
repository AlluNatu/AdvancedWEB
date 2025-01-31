import mongoose, { Document, Schema } from "mongoose";


interface IUser extends Document{
    email: string,
    username: string,
    password: string,
    isAdmin: Boolean
}

let userSchema: Schema = new Schema ({
    email: {type: String, required: true},
    username: {type : String, required: false},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: false}
})

const users: mongoose.Model<IUser> = mongoose.model<IUser>("users", userSchema)

export {users, IUser}