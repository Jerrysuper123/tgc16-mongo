//import functions from mongoUtil file
//require("./") is checking your own file
// otherwise will look into node_modules file 
const {connect, getDB} = require("./MongoUtil");

//config is to add dotenv as new varaible in the os
require("dotenv").config();
// process.env is to access to OS variable. then key value pair
// console.log(process.env.MONGO_URI);

const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");

const app = express();
app.set("view engine", "hbs");
//enable the form
app.use(express.urlencoded({ extended: false }));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

async function main() {
    // connect to the mongodb
    // first arg of the MongoClient.connect() is the URI (or your connection string)
    await connect(process.env.MONGO_URI, "sample_airbnb")

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        const data = await getDB().collection('listingsAndReviews') // select the listingsAndReviews collection
            .find({
                "beds":{
                    "$gt":3
                }
            },{
                "projection":{
                    "name":1,
                    "beds":1,
                    "description":1
                }
            })
            // or you can use .project({"name":1, "description":1})
            .limit(10)
            .toArray(); // find all documents

        res.render("listings",{
            "listings": data
        });
    })
}

main();

app.listen(3000, function(){
    console.log('this app has started')
})

