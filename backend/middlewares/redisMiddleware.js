import redisClient from '../services/redis.service.js';

// const cacheMiddleware = (keyPrefix, expiry = 3600) => async (req, res, next) => {
//   const cacheKey = `${keyPrefix}:${JSON.stringify(req.query || req.params || req.user?._id)}`;
  
//   try {
//     const cachedData = await redisClient.get(cacheKey);
//     if (cachedData) {
//       return res.status(200).json(JSON.parse(cachedData));
//     }
//     const originalJson = res.json;
//     res.json = async (data) => {
//       await redisClient.setex(cacheKey, expiry, JSON.stringify(data));
//       originalJson.call(res, data);
//     };
//     next();
//   } catch (error) {
//     console.error('Redis cache error:', error);
//     next();
//   }
// };

// export default cacheMiddleware;

const cacheMiddleware = (keyPrefix, expiry = 3600) => async (req, res, next) => {
  let cacheKey;

  if (req.params.id) {
    // For routes like /:id
    cacheKey = `${keyPrefix}:${req.params.id}`;
  } else if (Object.keys(req.query).length > 0) {
    // For routes like /?filters
    cacheKey = `${keyPrefix}:${JSON.stringify(req.query)}`;
  } else {
    // Default fallback
    cacheKey = `${keyPrefix}:default`;
  }

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const originalJson = res.json;
    res.json = async (data) => {
      await redisClient.setex(cacheKey, expiry, JSON.stringify(data));
      originalJson.call(res, data);
    };

    next();
  } catch (error) {
    console.error('Redis cache error:', error);
    next();
  }
};

export default cacheMiddleware;