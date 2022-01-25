import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IPhoto extends Document {
    id: number,
    title: string,
    image: string,
    votes: number
}

const PhotoSchema: Schema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    votes: {
        type: Number
    }
})


export const Photo: Model<IPhoto> = mongoose.models.Photo || model("Photo", PhotoSchema)