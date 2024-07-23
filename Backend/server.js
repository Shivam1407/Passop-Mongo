const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
require('dotenv').config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()

const port = process.env.PORT ||  3000
app.use(bodyparser.json())
app.use(cors())
client.connect();
//get pass
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

  res.json(findResult)
})
//save pass
app.post('/', async(req, res) => {
    const password  = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);

  res.send({success:true, result: findResult})
})
//delete pass
app.delete('/', async(req, res) => {
  const password  = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);

res.send({success:true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
//node --watch server.js