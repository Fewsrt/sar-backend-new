const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cache = (duration) => {
  return async (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') return next();

    const key = `cache:${req.originalUrl}`;
    
    try {
      const cachedResponse = await getAsync(key);
      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      // Store original send
      const originalSend = res.json;
      
      // Override res.json method
      res.json = async function(body) {
        await setAsync(key, JSON.stringify(body), 'EX', duration);
        originalSend.call(this, body);
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = cache; 