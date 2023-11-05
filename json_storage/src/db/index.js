const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

class MongoDatabase {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(this.url);
    this.db = null;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    } catch (error) {
      logger.error(`Error connecting to MongoDB: ${error.message}`);
    }
  }

  async insertOne(collectionName, document) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(document);
      return result;
    } catch (error) {
      logger.error(`Error inserting document into MongoDB: ${error.message}`);
    }
  }

  async findOne(collectionName, query, projection) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.findOne(query, { projection });
      return result;
    } catch (error) {
      logger.error(`Error finding document in MongoDB: ${error.message}`);
    }
  }
}

module.exports = MongoDatabase;
