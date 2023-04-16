const server=require("./api/server");
require("dotenv").config();

// eslint-disable-next-line no-undef
const PORT= process.env.PORT || 5001;

server.listen(PORT, ()=>{
    console.log(`server running on---> ${PORT} `)
})
