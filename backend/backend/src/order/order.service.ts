import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';

import { MongoClient, ObjectID } from 'mongodb';
const client = new MongoClient("mongodb://mongo:27017/tagme");
var db;

async function connectDb(){
    await client.connect();
}

connectDb();

@Injectable()
export class OrderService {
  updateOne(id: number, createOrderDto: UpdateOrderDto) {
    db.collection("orders").updateOne({"_id" : new ObjectID(id)}, 
                                    {$set : createOrderDto},
                                    {upsert : false});
    return 'ok';
  }

  findAll() {
    db.collection("orders").find({}).toArray((err, documents) => {
        return documents;
    });
  }

  findOne(id: number) {
    db.collection("orders").findOne({"_id" : new ObjectID(id)}, (err, doc) => {
        return doc
    });
  }
}
