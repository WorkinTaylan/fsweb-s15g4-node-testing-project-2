const db=require("../../data/dbconfig");

async function getAll(){
    const allPlayers= await db("AllStars")
    return allPlayers;
}

async function getById(id){
    return await db("AllStars").where("AllStars_id", id)
}

async function create(oyuncu){

    const sonuc=await db("AllStars").insert(oyuncu)
    return getById(sonuc[0])
}

async function remove(AllStars_id){
    await db("AllStars").where("AllStars_id", AllStars_id).del()
    return getAll()
}

async function update(AllStars_id, oyuncu){
    await db("AllStars").where("AllStars_id",AllStars_id ).update(oyuncu)
    return getById(AllStars_id)
}

module.exports={
    getAll,
    getById,
    create,
    remove,
    update
}