const bparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = 3001;
const { MongoClient, ObjectID } = require('mongodb');
const client = new MongoClient("mongodb://0.0.0.0:27017/tagme");
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
            photo : order.photo
        });
    });
}

setupDb();

const app = express();
app.use(bparser.urlencoded({extended: true}));
app.use(bparser.json());
app.use(cors());

app.get("/order", (req, res) => {
    // res.json([{"_id":"60c2902d101a6738301a64d6","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c290427dfd5e387bae6a3f","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c29065ddd50e3899ed77bf","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c2907b65a08138f0a32a97","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c291db7459733a35634a90","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c292b2361dcc3aff45e8c1","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c292b890f0f23b14a1f80e","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c292bfb7f6503b29df63bd","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c2931614610c3b3e194b7e","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c29355d1e4b53bae99bca4","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c293a39b44223bc31d3dd1","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c293af2dbd0e3be6d3366b","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c293b258822d3bfae5cca1","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]},{"_id":"60c293c02872e73c0febd8fb","name":"Order","photo":"photo","description":"description","ingredients":["1"],"steps":["1"]}]);
    db.collection("orders").find({}).toArray((err, documents) => {
        res.json(documents);
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