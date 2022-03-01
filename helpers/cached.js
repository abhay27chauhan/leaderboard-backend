const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL;
let client = redis.createClient({
  url: REDIS_URL,
});

client.connect();

async function cached(req, res, next) {
  const pageNumber = req.query.pageNumber
    ? Number(req.query.pageNumber)
    : undefined;
  const currentUser = req.query.currentUser ? req.query.currentUser : undefined;

  const key = currentUser ? `${currentUser}_${pageNumber}` : pageNumber;
  try {
    let data = await client.get(key);
    data = JSON.parse(data);
    if (!data) {
      next();
    } else {
      res.status(200).json({ success: true, ...data });
    }
  } catch (error) {
    throw error;
  }
}

async function setToRedis(key, data) {
  await client.setEx(key, 3600, JSON.stringify(data));
}

module.exports = {
  cached,
  setToRedis,
};
