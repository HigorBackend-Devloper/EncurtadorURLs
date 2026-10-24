import mongoose, { Schema } from "mongoose";

// TODO: pensar em required, unique e default nos campos
const urlSchema = new Schema({
    urlOriginal:{type: String},
    codigo:{type: String},
    cliques:{type:Number},
    pesquisas:{type:Number},
    createdAt:{type: Date}
},{versionKey: false});

const Url = mongoose.model("urls", urlSchema);

export default Url
