import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description: "Chat with your travellersmeet matches.",
};

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  return (
    <ChatInterface
      currentUser={{
        id: session.user.id,
        name: session.user.name || "Traveller",
        image: session.user.image || null,
        email: session.user.email || undefined,
      }}
    />
  );
}
