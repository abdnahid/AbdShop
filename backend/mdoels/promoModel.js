import mongoose from "mongoose";

const PromoSchema = mongoose.Schema({
    code:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    value:{
        type:Number,
        required:true,
    }
});

const Promo = mongoose.model("Promo",PromoSchema);

export default Promo;