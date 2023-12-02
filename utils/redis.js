// Import the Redis library
const redis = require('redis');

class RedisClient {
  constructor() {
    // Creating a Redis client
    this.client = redis.createClient();

    // Handling error event
    this.client.on('error', (err) => {
      console.error('Redis client error', err);
    });

    // Connect to the Redis server
    this.client.connect();
  }

  // Check if the Redis connection is alive
  isAlive() {
    return this.client.isOpen;
  }

  // Get a value from Redis
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Redis get error', error);
      return null;
    }
  }

  // Set a value in Redis with expiration
  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (error) {
      console.error('Redis set error', error);
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Redis delete error', error);
    }
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
