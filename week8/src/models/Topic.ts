import mongoose, { Document, Schema } from "mongoose";


interface ITopic extends Document{
    title: string,
    content: string,
    username: string,
    createdAt: Date
}

let topicSchema: Schema = new Schema ({
    title: {type: String, required: true},
    content: {type : String, required: false},
    username: {type: String, required: true},
    createdAt: {type: Date, required: false}
})

const topics: mongoose.Model<ITopic> = mongoose.model<ITopic>("topics", topicSchema)

export {topics, ITopic}