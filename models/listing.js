const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingschema = new schema({
    title: {
        type: String,
        required:true, // title jarure hai requer mean

    },
    description: String,
    image:{
        filename: {
        type: String,
        default: "listingimage",
    },
        url:{
            type:String,
            default:
            "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        
        set : (v) => v === "" ?
         "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
          : v,
        },
    },
    price:Number,
    location:String,
    country: String,
});

const listing = mongoose.model("listing", listingschema);  
module.exports = listing;
