import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";



 dotenv.config()
const app = express();
const PORT=process.env.PORT 
app.use(express.json());

const MONGO_URI=process.env.MONGODB_URI as string
const DB_NAME = process.env.DB_NAME;

async function connectToDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(DB_NAME);

    const usersCollection = db.collection('users');

    app.get('/', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.json(users);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
