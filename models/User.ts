import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IUser extends Document {
    id: number,
    email: string,
    votes: number
}

const UserSchema: Schema = new Schema({
    id: {
        type: Number
    },
    email: {
        type: String
    },
    votes: {
        type: Number
    }
})


export const User: Model<IUser> = mongoose.models.User || model("User", UserSchema)