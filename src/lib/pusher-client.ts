import PusherClient from "pusher-js";

const key = process.env.NEXT_PUBLIC_PUSHER_KEY || "dummy-key";
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";

export const getPusherClient = () => {
  if (typeof window === "undefined") return null;

  const globalWithPusher = window as typeof window & {
    pusherClient?: PusherClient;
  };

  if (!globalWithPusher.pusherClient) {
    globalWithPusher.pusherClient = new PusherClient(key, {
      cluster,
      forceTLS: true,
    });
  }

  return globalWithPusher.pusherClient;
};
