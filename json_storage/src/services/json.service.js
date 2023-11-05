const keys = require('../configs/keys');
const { APIError } = require('../constants/errors');
const MongoDatabase = require('../db');

class JsonService {
  constructor() {
    this.mongoDB = new MongoDatabase(keys.db.url, keys.db.name);
  }

  async saveJsonByUrl(jsonPath, data) {
    const existingData = await this.mongoDB.findOne(jsonPath);

    if (existingData) {
      throw new APIError('JSON data already exists for this path.');
    }

    await this.mongoDB.insertOne(jsonPath, data);

    const dataWithoutId = { ...data };
    delete dataWithoutId._id;

    return dataWithoutId;
  }

  async getJsonByUrl(jsonPath) {
    const data = await this.mongoDB.findOne(jsonPath, {}, { _id: 0 });

    if (!data) {
      throw new APIError('JSON not found.');
    }

    return data;
  }
}

module.exports = new JsonService();
