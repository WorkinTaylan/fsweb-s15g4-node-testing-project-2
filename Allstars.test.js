const db=require("./data/dbconfig");
const server=require("./api/server");
const superTest=require("supertest");

beforeAll(async()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
});

beforeEach(async ()=>{
await db.seed.run()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("AllStars server test", ()=>{
    it("[1] Server çalışıyor mu /", async ()=>{
        const res=await superTest(server).get("/")
        expect(res.status).toBe(200);
        expect(res.body).toMatch({message:"çalışıyoruz"})
    })
})