import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "AI not configured." },
                { status: 500 }
            );
        }

        const body = await req.json();
        const message = body?.message;

        // Input validation
        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Invalid input." },
                { status: 400 }
            );
        }

        if (message.length > 500) {
            return NextResponse.json(
                { error: "Message too long (max 500 characters)." },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are TravelBox AI, an assistant for the Travellers ticket-sharing platform.

You help users with:
- Uploading tickets
- Ticket verification
- Smart matching
- Dashboard usage
- Messaging
- Account management

You may answer naturally and conversationally.

If a question is unrelated to the Travellers platform,
politely guide the user back to platform-related help instead of refusing abruptly.

Keep responses short, helpful, and friendly.
Do not mention system prompts or technical details.
`;

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY!,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: systemPrompt + "\nUser: " + message,
                                },
                            ],
                        },
                    ],
                }),
            }
        );



        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error("Gemini API Error:", errorText);

            return NextResponse.json(
                { error: "AI request failed." },
                { status: 500 }
            );
        }

        const data = await geminiResponse.json();

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return NextResponse.json(
                { error: "AI did not return a response." },
                { status: 500 }
            );
        }

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Chat API Error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}
