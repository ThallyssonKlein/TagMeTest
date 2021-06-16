import { Injectable } from '@nestjs/common';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

import { MongoClient, ObjectID } from 'mongodb';
const client = new MongoClient("mongodb://mongo:27017/tagme");
var db;

async function connectDb(){
    await client.connect();
}

connectDb();

@Injectable()
export class RecipeService {

  findOne(id: number) {
    db.collection("recipes").findOne({"_id" : new ObjectID(id)}, (err, doc) => {
        return doc;
    });
  }

  updateOne(id: number, updateRecipeDto: UpdateRecipeDto) {
    if(updateRecipeDto["ingredients"]){
          db.collection("recipes").updateOne({"_id" : new ObjectID(id), 
                                              "ingredients.name" : updateRecipeDto["ingredients"][0].name}, 
                                              {$set : {
                                                  "ingredients.$.checked" : updateRecipeDto["ingredients"][0].checked
                                              }}, {upsert : false});
      }else{
          db.collection("recipes").updateOne({"_id" : new ObjectID(id), 
                                              "steps.name" : updateRecipeDto["steps"][0].name}, 
                                              {$set : {
                                                  "steps.$.checked" : updateRecipeDto["steps"][0].checked
                                              }}, {upsert : false});
      }
      return "";
  }
}
