"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(1000),
});

export async function sendContactMessage(formData: { name: string; email: string; message: string }) {
  // Validate request inputs on the server
  const validationResult = contactSchema.safeParse(formData);
  
  if (!validationResult.success) {
    const errorMsg = validationResult.error.issues.map(err => err.message).join(", ");
    return {
      success: false,
      message: `Security validation failed: ${errorMsg}`,
    };
  }

  const { name, email, message } = validationResult.data;

  // Sanitize text content to prevent XSS / Injection attempts
  const sanitizedName = name.replace(/<\/?[^>]+(>|$)/g, "");
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedMessage = message.replace(/<\/?[^>]+(>|$)/g, "");

  try {
    // Simulate server processing (e.g. sending email via Resend / Nodemailer or storing to DB)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("=== SECURE INBOUND MESSAGE ===");
    console.log(`From: ${sanitizedName} (${sanitizedEmail})`);
    console.log(`Payload: ${sanitizedMessage}`);
    console.log("==============================");

    // In a production app, you would execute:
    // await resend.emails.send({ ... })

    return {
      success: true,
      message: "Security check passed. Message payload transmitted successfully!",
    };
  } catch (error) {
    console.error("Secure transmission error:", error);
    return {
      success: false,
      message: "Server transmission failed. Please try again later.",
    };
  }
}
