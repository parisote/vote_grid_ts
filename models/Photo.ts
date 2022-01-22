import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IPhoto extends Document {
    id: number,
    title: string,
    image: string,
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
    }
})


export const Photo: Model<IPhoto> = mongoose.models.Photo || model("Photo", PhotoSchema)