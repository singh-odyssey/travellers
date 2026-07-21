import PusherClient from "pusher-js";

const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

export const getPusherClient = () => {
  if (typeof window === "undefined") return null;
  if (!key || !cluster) return null;

  const globalWithPusher = window as typeof window & {
    pusherClient?: PusherClient;
  };

  if (!globalWithPusher.pusherClient) {
    globalWithPusher.pusherClient = new PusherClient(key, {
      cluster,
      forceTLS: true,
      authEndpoint: "/api/pusher/auth",
    });
  }

  return globalWithPusher.pusherClient;
};
