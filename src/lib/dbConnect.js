import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
    userCollection: 'users',
    courseCollection: 'courses',
    classCollection: 'classes',
    teacherCollection: 'teachers',
    studentCollection: 'students',
    newsletterCollection: 'subscribe',
    reviewCollection: 'reviews',
    resultCollection: 'results',
    blogCollection: 'blogs',
    enrollmentCollection: 'enrollments',
}

const uri = process.env.MONGODB_URI;


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