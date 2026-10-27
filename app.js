const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // use for cretae template;
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} =require("./schema.js");
const { request } = require("http");


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


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



app.get("/",(req, res) => {
    res.send("hii i m root");
})

const validateListing = (req,res, next) =>{
    let {error} = listingSchema.validate(req.body);
        console.log("Joi validation middleware called"); // Yahan likho 
    if(!request.error){
         let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,error.message);
      
    }else{
        next();
    }
}

//index route
app.get("/listings", wrapAsync(async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});    
       }));

        
//new route
app.get("/listings/new", (req,res) =>{
    res.render("listings/new.ejs");
})

 //show route for lsiting detail
 app.get("/listings/:id", wrapAsync( async(req, res) =>  {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing});    
 }));
 
 
 //create route
 app.post("/listings",validateListing , wrapAsync( async (req,res,next) =>{        
     const newListing = new Listing(req.body.listing);   
    await newListing.save();
      res.redirect("/listings");      
   
 }));

 //edit route
 app.get("/listings/:id/edit", wrapAsync(async (req,res) =>{
     let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing });    
 }));

 //update route
 app.put("/listings/:id",validateListing , wrapAsync( async (req,res) =>{    
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);    
 }));

 //detete route
 app.delete("/listings/:id" , wrapAsync(async (req,res) =>{
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
 }));


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
// });
app.use((err,req,res,next) =>{
    console.log("page not found");
    next();
})

app.listen(8080, () =>{
    console.log("server is listing to port 8080");
})
