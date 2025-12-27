import { asyncHandler } from "../utils/asyncHandler.js";

const regsiterUser=asyncHandler(async(req,res)=>{
  return res.status(200).json({
    message:"ok"
  })
})

export {regsiterUser};