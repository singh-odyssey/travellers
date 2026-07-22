import Redis from "ioredis";

const globalForRedis = global as unknown as {
  redis?: Redis | null;
};

function createRedis(): Redis | null {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    console.warn("Redis not configured. Cache disabled.");
    return null;
  }

  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    retryStrategy: () => null,
  });

  client.on("error", (err) => {
    console.warn("Redis unavailable:", err.message);
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedis();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export default redis;
