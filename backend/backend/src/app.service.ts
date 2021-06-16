import { Injectable } from '@nestjs/common';

import { MongoClient } from 'mongodb';
const client = new MongoClient("mongodb://mongo:27017/tagme");
var db;
import orders from './pratos';

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

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
