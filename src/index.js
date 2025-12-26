// require('dotenv').config({path:'./env'})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";


connectDB()
// async function connectionDB()
// {
//   await mongoose.connect
// }

//FIRST APPROACH
// import express from "express";
// const app=express();

// (async ()=>{
//    try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",()=>{
//       console.log("error",error)
//     })

//     app.listen(process.env.PORT,()=>{
//       console.log(`app is listening on ${process.env.PORT}`)
//     })

//   } catch (error) {
//     console.error(error);
//    }
// })()