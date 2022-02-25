//config is to add dotenv as new varaible in the os
require("dotenv").config();
// process.env is to access to OS variable. then key value pair
console.log(process.env.MONGO_URI);

const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");

// Bring in the mongoclient
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.set("view engine", "hbs");

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");


//set unified change, set to true
async function main() {
    
    let client = await MongoClient.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true
    })
    // 
    app.get('/', async function (req, res) {
        // await for all because the file is big
        const data =  await client.db('sample_airbnb') // select the sample_airbnb database
                         .collection('listingsAndReviews') // select the listingsAndReviews collection
                         .find({})
                         .toArray(); // find all documents
         res.send(data);
     })
}

main();



app.listen(3000, function(){
    console.log('this app has started')
})

