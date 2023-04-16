const starModels=require("./all-stars-models");

async function AllStarsIdKontrol(req,res,next){
    try {
        const existPlayer=await starModels.getById(req.params.id)
        if(!existPlayer){
            res.status(404).json({message:"Bulamadık"})
    }
        else{
            req.player=existPlayer;
            next()
        }
    } catch (error) {
        next(error)
    }
}



module.exports={
AllStarsIdKontrol
}