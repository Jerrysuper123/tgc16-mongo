// Bring in the mongoclient
const MongoClient = require('mongodb').MongoClient;

//this is a global variable to that DB() can access and return later
let _db;

async function connect(uri, dbname){
    const client = await MongoClient.connect(uri , {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    _db = client.db(dbname);
    console.log("database has been connected")
}

function getDB(){
    return _db;
}

//export modules
module.exports = {
    connect,
    getDB
}