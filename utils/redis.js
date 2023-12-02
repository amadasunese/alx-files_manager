const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting value from Redis for key:', key, error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
      return true;
    } catch (error) {
      console.error('Error setting value in Redis for key:', key, error);
      return false;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Error deleting value from Redis for key:', key, error);
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
