// Assuming you have utils to check Redis and DB status
const { checkRedis, checkDB } = require('../utils/dbUtils');

// Assuming you have methods to get counts from the database
const { getUserCount, getFileCount } = require('../utils/dbQueries');

const AppController = {
  getStatus: async (req, res) => {
    const redisAlive = await checkRedis();
    const dbAlive = await checkDB();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  },

  getStats: async (req, res) => {
    const users = await getUserCount(); // Count from 'users' collection
    const files = await getFileCount(); // Count from 'files' collection
    res.status(200).json({ users, files });
  },
};

module.exports = AppController;
