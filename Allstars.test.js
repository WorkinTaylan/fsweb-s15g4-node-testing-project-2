/* eslint-disable no-undef */
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
        expect(res.body.message).toMatch(/çalışıyoruz/i)
    },1000);
})

describe("Endpoint Testleri", ()=>{
    it("[2] Doğru sayıda oyuncu dönüyor /", async ()=>{
        const res=await superTest(server).get("/AllStars")
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3)
    },1000);

    it("[3] Doğru oyuncu isimlerini dönüyor /", async ()=>{
        const res=await superTest(server).get("/AllStars")
        expect(res.status).toBe(200);
        let arr=[];
        res.body.forEach(item=>{
            arr.push(item.Player_Name)
            expect(arr).toContain("Kobe","Iverson","Chris Bosh")
        })
    },1000);

    it("[4] Verilen id ile doğru oyuncu isimlerini dönüyor /", async ()=>{
        const res=await superTest(server).get("/AllStars/1")
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([{
            "AllStars_id": 1,
            "Player_Name": "Kobe",
            "Forma_No": 24
        }])

    },1000);

    it("[5] Yeni oyuncu post başarılı /", async ()=>{
        const res=await superTest(server).post("/AllStars").send({Player_Name:"TEST",Forma_No:52})
        expect(res.status).toBe(201);
        expect(res.body.length).toBe(1)

    },1000);
    
    it("[6] Yeni oyuncu id alıyor /", async ()=>{
        const res=await superTest(server).post("/AllStars").send({Player_Name:"TEST",Forma_No:52})
        expect(res.status).toBe(201);
        expect(res.body[0]).toHaveProperty("AllStars_id")

    },1000);
    it("[7] Yeni oyuncu doğru verileri alıyor /", async ()=>{
        const res=await superTest(server).post("/AllStars").send({Player_Name:"TEST",Forma_No:52})
        expect(res.status).toBe(201);
        expect(res.body[0]).toMatchObject({"AllStars_id": 4, "Forma_No": 52, "Player_Name": "TEST"})

    },1000);

    it("[8] Veriler eksikse doğru mesaj /", async ()=>{
        const res=await superTest(server).post("/AllStars").send({Player_Name:"",Forma_No:52})
        expect(res.status).toBe(422);
        expect(res.body.message).toMatch(/Oyuncu İsmi veya Forma Numarası eksik/i)

    },1000);

    it("[9] Veriler eksikse doğru mesaj /", async ()=>{
        const res=await superTest(server).post("/AllStars").send({Player_Name:"TEST",Forma_No:null})
        expect(res.status).toBe(422);
        expect(res.body.message).toMatch(/Oyuncu İsmi veya Forma Numarası eksik/i)

    },1000);

    it("[10] Silme işlemi başarılı /", async ()=>{
        const res=await superTest(server).del("/AllStars/1")
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        
        const res2=await superTest(server).get("/AllStars/1");
        expect(res2.status).toBe(404);
        expect(res2.body.message).toMatch(/Aranılan oyuncu bulunamadı/i);

    },1000);
})