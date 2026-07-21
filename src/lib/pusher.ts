import Pusher from "pusher";

const appId = process.env.PUSHER_APP_ID;
const key = process.env.PUSHER_KEY;
const secret = process.env.PUSHER_SECRET;
const cluster = process.env.PUSHER_CLUSTER;

const isConfigured = !!(appId && key && secret && cluster);

export const pusherServer = isConfigured
  ? new Pusher({
      appId: appId!,
      key: key!,
      secret: secret!,
      cluster: cluster!,
      useTLS: true,
    })
  : null;

if (!isConfigured) {
  console.warn(
    "⚠️ Pusher environment variables (PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER) are not fully configured. Real-time updates will be logged to the console but not delivered."
  );
}

export async function triggerPusher(channel: string, event: string, data: any) {
  if (pusherServer) {
    try {
      await pusherServer.trigger(channel, event, data);
    } catch (error) {
      console.error(`Error triggering Pusher event '${event}' on channel '${channel}':`, error);
    }
  } else {
    console.log(`[Pusher Mock Trigger] Channel: ${channel}, Event: ${event}, Data:`, data);
  }
}
