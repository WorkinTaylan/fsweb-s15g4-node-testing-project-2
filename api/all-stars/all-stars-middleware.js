const starModels=require("./all-stars-models");

async function AllStarsIdKontrol(req,res,next){
    try {
        let existPlayer=await starModels.getById(req.params.AllStars_id)
        if(existPlayer.length==0){
            res.status(404).json({message:"Aranılan oyuncu bulunamadı"})
    }
        else{
            req.player=existPlayer;
            next()
        }
    } catch (error) {
        next(error)
    }
}

async function AllStarsPayloadKontrol(req,res,next){
    try {
        const {Player_Name, Forma_No}=req.body
        if(!Player_Name || !Forma_No){
            res.status(422).json({message:"Oyuncu İsmi veya Forma Numarası eksik"})
        }
        else{
            
            next()
        }
    } catch (error) {
        next(error)
    }
}



module.exports={
AllStarsIdKontrol,
AllStarsPayloadKontrol
}