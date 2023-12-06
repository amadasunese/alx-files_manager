const redis = require('../utils/redis');
const db = require('../utils/db');

module.exports = {
  async getStatus(req, res) {
    const redisStatus = await redis.isAlive();
    const dbStatus = await db.isAlive();

    res.status(200).json({
      redis: redisStatus,
      db: dbStatus,
    });
  },

  async getStats(req, res) {
    const usersCount = await db.collection('users').countDocuments();
    const filesCount = await db.collection('files').countDocuments();

    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  },
};
