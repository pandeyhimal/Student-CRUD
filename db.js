const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);      //MONGO_URI=mongodb://localhost:27017
let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db('studentDB');

    // Create unique index for email
    await db.collection('students').createIndex({ email: 1 }, { unique: true });

    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getDB };
