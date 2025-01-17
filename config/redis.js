// const { createClient } = require('redis');

// const redisClient = createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379',
//   socket: {
//     reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
//     connectTimeout: 1000,
//   },
//   commandsQueueMaxLength: 100,
// });

// // Add error handling and reconnection logic
// redisClient.on('error', (err) => console.error('Redis Client Error:', err));
// redisClient.on('connect', () => console.log('Redis Client Connected'));
// redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));

// redisClient.connect().catch(console.error);

// module.exports = redisClient; 