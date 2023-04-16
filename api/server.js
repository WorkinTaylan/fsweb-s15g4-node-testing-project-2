const express=require("express");
const server=express();
server.use(express.json());

const AllStarsRouter=require("./all-stars/all-stars-router")

server.get("/", async (req,res)=>{
    res.status(200).json({message:"çalışıyoruz"})
})

server.use("/AllStars", AllStarsRouter)

module.exports=server;