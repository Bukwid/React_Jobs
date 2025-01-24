import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://bukwid:kebuquid221001251@reactjobs.ctkpt.mongodb.net/?retryWrites=true&w=majority&appName=ReactJobs"; 

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    // Access collections
    const database = client.db('ReactJobs');
    const usersCollection = database.collection('jobs');
    return usersCollection;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}
export default connectToDatabase;