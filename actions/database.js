"use server";
require('dotenv').config(); 
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'fundrasing'; 
const collectionName = 'fundrasing'; 

async function connectToDB() {
  // Ensure the client is connected
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  const db = client.db(dbName);
  return db.collection(collectionName);
}

export async function getProgress() {
  try {
    const collection = await connectToDB();
    const progressDoc = await collection.findOne({});
    return progressDoc ? progressDoc.progressPercentage : null;
  } catch (error) {
    console.error('Error getting progress:', error);
    throw error;
  }
}
export async function setProgress(newProgress) {
    try {
      if (typeof newProgress !== 'number') {
        throw new Error('Progress value must be a number');
      }
      const collection = await connectToDB();
  
      const result = await collection.updateOne(
        {},
        { $set: { progressPercentage: newProgress } },
        { upsert: true } 
      );
  
      // Convert result to a plain object
      const plainResult = {
        acknowledged: result.acknowledged,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId ? result.upsertedId.toString() : null, // Convert ObjectId to string if present
        upsertedCount: result.upsertedCount,
        matchedCount: result.matchedCount,
      };
  
      return plainResult; // Return this simple object instead
    } catch (error) {
      console.error('Error setting progress:', error);
      throw error;
    }
  }