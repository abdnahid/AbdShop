import asyncHandler from "express-async-handler";
import Promo from "../mdoels/promoModel.js";



// @desc save new promo code
// @route POST api/promos
// @access privateAdmin
export const addPromo = asyncHandler(async(req,res)=>{
    try {
        const {code,type,value}=req.body;
        const codeExists = await Promo.findOne({code});
        if (codeExists) {
            res.status(400);
            throw new Error("Code Already Exists")
        }
        const newPromo = await Promo.create({code,type,value})
        if (newPromo) {
            res.status(201).json({msg:"Promo Added Successfully"})
        }else{
            res.status(404);
            throw new Error("Invalid Code to save")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})

// @desc get existing promo code
// @route GET api/promos
// @access public

export const getPromo = asyncHandler(async(req,res)=>{
    console.log(req.query)
    const {code}=req.query;
    try {
        const authorizedCode = await Promo.findOne({code});
        if (authorizedCode) {
            res.status(201).json({
                code:authorizedCode.code,
                type:authorizedCode.type,
                value:authorizedCode.value
            })
        }else{
            res.status(404);
            throw new Error("Code Not Available")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
})