const mongoose = require("mongoose");
const intiData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wounderlust";


main().then(()=>{
    console.log("connect to db");
}).catch((e)=>{
    console.log(e);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
await Listing.deleteMany({});
intiData.data = intiData.data.map((obj)=>({
...obj,
owner:"68fa34ebe1b98b2ca7439dd0",
}));
await Listing.insertMany(intiData.data);
console.log("data is initialised!");
}

initDB();