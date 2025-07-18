import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
    courseCollection: 'courses',
    newsletterCollection: 'subscribe',
}

const uri = process.env.MONGODB_URI;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PUSS}@cluster0.9njqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default function dbConnect (collectionName){
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      return client.db('learning-management').collection(collectionName)
}