const bparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = 3001;
const { MongoClient, ObjectID } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017/tagme");
var db;
const orders = require('./pratos');

async function setupDb(){
    await client.connect();
    db = client.db();
    orders.forEach(async order => {
        const result = await db.collection("recipes").insertOne({
            ingredients : order.ingredients,
            steps : order.steps
        });
        db.collection("orders").insertOne({
            name : order.name,
            description : order.description,
            recipeId : result.insertedId,
            photo : order.photo,
            when : order.when
        });
    });
}

setupDb();

const app = express();
app.use(bparser.urlencoded({extended: true}));
app.use(bparser.json());
app.use(cors());

app.post("/order/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.collection("orders").updateOne({"_id" : new ObjectID(id)}, 
                                      {$set : body},
                                      {upsert : false});
    res.send();
});

app.get("/order", (req, res) => {
    db.collection("orders").find({}).toArray((err, documents) => {
        res.json(documents);
    });
});

app.get("/order/:id", (req, res) => {
    const id = req.params.id;
    db.collection("orders").findOne({"_id" : new ObjectID(id)}, (err, doc) => {
        res.json(doc);
    });
});

app.get("/recipe/:id", (req, res) => {
    const id = req.params.id;
    db.collection("recipes").findOne({"_id" : new ObjectID(id)}, (err, doc) => {
        res.json(doc);
    });
});

app.post("/recipe/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if(body["ingredients"]){
        db.collection("recipes").updateOne({"_id" : new ObjectID(id), 
                                            "ingredients.name" : body.ingredients[0].name}, 
                                            {$set : {
                                                "ingredients.$.checked" : body.ingredients[0].checked
                                            }}, {upsert : false});
    }else{
        db.collection("recipes").updateOne({"_id" : new ObjectID(id), 
                                            "steps.name" : body.steps[0].name}, 
                                            {$set : {
                                                "steps.$.checked" : body.steps[0].checked
                                            }}, {upsert : false});
    }
    res.send();
});

app.listen(port, `0.0.0.0`);

module.exports = app;
