const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.MONGO_URL || process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";


main().then(() => {
    console.log("connected to db");
    return initDB();
}).then(() => {
    mongoose.connection.close();
}).catch((e) => {
    console.log(e);
    mongoose.connection.close();
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    let owner = await User.findOne({ username: "demo-owner" });
    if (!owner) {
        owner = await User.register(
            new User({ username: "demo-owner", email: "demo@example.com" }),
            "password"
        );
    }

    await Listing.deleteMany({});
    const listings = initData.data.map((obj) => ({
        ...obj,
        owner: owner._id,
    }));
    await Listing.insertMany(listings);
    console.log("data is initialized!");
};
