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
const helpers = require('handlebars-helpers')(
    {
        'handlebars': hbs.handlebars
    }
)
const wax = require("wax-on");
const { ObjectId } = require("mongodb");

const app = express();
app.set("view engine", "hbs");
//enable the form
app.use(express.urlencoded({ extended: false }));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");
//import in ObjectId
// const ObjectId = require("")

async function main() {
    // connect to the mongodb
    // first arg of the MongoClient.connect() is the URI (or your connection string)
    //once you save a doc into collection, then you created db (you do not need to create db yourself)
    await connect(process.env.MONGO_URI, "tgc16-food")

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        // res.send("Show all food records")
        let db = getDB();
        let allFood = await db.collection("food_records").find({}).toArray();
        res.render("all_food",{
            "foodRecords": allFood
        })
    })

    app.get("/food/add", async function(req,res){
        //get all tags
        // const db = getDB();
        // let allTags = await db.collection("all_tags").find().toArray();

        res.render("add_food.hbs",{
            // "tags": allTags
        });
    })

    app.post("/food/add", async function(req,res){
        console.log(req.body);
        //1. retrieve info from user submission
        // let foodName = req.body.foodName;
        // let calories = req.body.calories;
        // let tags = req.body.tags;

        //object destructing
        let {foodName, calories, tags} = req.body;
        // let tagArray = tags.split(",");

        let tagArray = [];
        if(tags){
            if(Array.isArray(tags)){
                tagArray = tags;
            } else{
                tagArray = [tags]
            }
        }

        //2. make a document
        let foodDocument = {
            'name' : foodName,
            "calories" : calories,
            "tags" : tagArray
        }

        let db = getDB();
        //3, insert one doc intot the collection
        await db.collection("food_records").insertOne(foodDocument);
        //must always return sth, otherwise it will cause an error
        res.send("info received");
    })

    app.get("/food/:food_id/edit", async function(req, res){
        // res.send("Editing" + req.params.food_id);
        //get the doc witht id as the params
        let foodDoc = await getDB().collection("food_records").findOne({
            "_id": ObjectId(req.params.food_id)
        });
        res.render("edit_food",{
            "food": foodDoc
        });
    })
}

main();

app.listen(3000, function(){
    console.log('this app has started')
})

