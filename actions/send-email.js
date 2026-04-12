"use server";


import { Resend } from "resend";
export async function sendEmail({ to, subject, react }) {
  // Adding defensive coding for Next.js build and edge environments
  const apiKey = process.env.RESEND_API_KEY || "dummy_key";
  const resend = new Resend(apiKey);
  if (apiKey === "dummy_key") {
    console.warn("WARNING: RESEND_API_KEY is not defined in the environment!");
  }

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
