import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Handler<T> = (req: NextRequest, data: T) => Promise<NextResponse>;

/**
 * A higher-order function that wraps a Next.js Route Handler with Zod schema validation.
 * It automatically handles parsing JSON or FormData and returns a standardized 400 response
 * if validation fails.
 *
 * @param schema The Zod schema to validate the request payload against
 * @param handler The route handler function to execute if validation succeeds
 */
export function withValidation<T>(schema: z.ZodSchema<T>, handler: Handler<T>, customErrorMsg?: string) {
  return async (req: NextRequest) => {
    try {
      const contentType = req.headers?.get("content-type") ?? "";
      let rawData: unknown;

      try {
        if (contentType.includes("application/json")) {
          rawData = await req.json();
        } else if (
          contentType.includes("multipart/form-data") ||
          contentType.includes("application/x-www-form-urlencoded")
        ) {
          const form = await req.formData();
          rawData = Object.fromEntries(form.entries());
        } else {
          // If no content-type is provided (e.g. in test mocks), check available methods
          if (typeof req.formData === "function") {
            const form = await req.formData();
            rawData = Object.fromEntries(form.entries());
          } else if (typeof req.json === "function") {
            rawData = await req.json();
          } else if (typeof req.text === "function") {
            const text = await req.text();
            rawData = text ? JSON.parse(text) : {};
          } else {
            rawData = {};
          }
        }
      } catch (parseError) {
        console.error("Payload parse error:", parseError);
        return NextResponse.json(
          { error: "Invalid request format" },
          { status: 400 }
        );
      }

      const result = schema.safeParse(rawData);

      if (!result.success) {
        return NextResponse.json(
          { error: customErrorMsg ?? "Invalid input", details: result.error.flatten() },
          { status: 400 }
        );
      }

      return await handler(req, result.data);
    } catch (error) {
      console.error("API Error (withValidation wrapper):", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
