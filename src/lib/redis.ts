import Redis from "ioredis";

// Extend global namespace to prevent multiple instances in development (Next.js HMR)
const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis(process.env.REDIS_URL || "redis://localhost:6379");

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export default redis;
