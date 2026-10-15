const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("connected to DB");
})
.catch((err) =>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req, res) => {
    res.send("hii i m root");
})
app.get("/listings",async (req,res) =>{
    const allListing = await listing.find({});
    res.render("index.ejs",{allListing});
    
       })

// app.get("/testrouting", async (req,res) =>{
//     let samplelisting = new listing({
//         title:'my villa',
//         description:"By the beatch",
//         price:1220,
//         location:"Goa",
//         country : "India",
//     });
//      await samplelisting.save();
//      console.log("sample was saved");
//      res.send('susseful testing');
// })

app.listen(8080, () =>{
    console.log("server is listing to port 8080");
})
