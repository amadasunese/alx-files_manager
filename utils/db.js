const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Environment variables or default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB URI
    const uri = `mongodb://${host}:${port}`;

    // Create a new MongoClient
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Successfully connected to MongoDB');
      })
      .catch((err) => console.error('MongoDB connection failed', err));

    // Flag to track if the connection is successful
    this.isConnected = false;
    this.client.on('open', () => {
      this.isConnected = true;
    });
  }

  // Check if the MongoDB connection is alive
  isAlive() {
    return this.isConnected;
  }

  // Get the number of documents in the 'users' collection
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error in nbUsers', err);
      return 0;
    }
  }

  // Get the number of documents in the 'files' collection
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error in nbFiles', err);
      return 0;
    }
  }
}

// Export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
