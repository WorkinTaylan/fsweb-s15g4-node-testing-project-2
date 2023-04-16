const router=require("express").Router();
const starModels=require("./all-stars-models");
const mw=require("./all-stars-middleware")

router.get("/", async (req,res,next)=>{
    const Players=await starModels.getAll()

    try {
        if(Players){
            res.status(200).json(Players)
        } else {
            res.status(404).json({message:"Kimseyi Bulamadık"})
            next();
        }
    } catch(error){
        next(error);

    }

});

router.get("/:AllStars_id", mw.AllStarsIdKontrol, async (req,res,next)=>{


    try {
        res.json(req.player)
    } catch(error){
        next(error);

    }

});

router.post("/",mw.AllStarsPayloadKontrol, async (req,res,next)=>{


    try {
        const inserted=await starModels.create({Player_Name:req.body.Player_Name, Forma_No:req.body.Forma_No})
        res.status(201).json(inserted)
    
    } catch(error){
        next(error);

    }

});

router.delete("/:AllStars_id", mw.AllStarsIdKontrol, async (req,res,next)=>{

    try {
        let deleted = await starModels.remove(req.params.AllStars_id)
        res.status(200).json(deleted)
    } catch(error){
        next(error);
    }
});


module.exports=router;