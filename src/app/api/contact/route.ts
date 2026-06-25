import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- INDUSTRY STANDARD: IN-MEMORY RATE LIMITER ---
// This stores IPs to prevent spam. (Note: On Vercel, this resets on cold starts,
// but it is highly effective at stopping rapid-fire bot attacks).
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // 1. BACKEND RATE LIMITING (SECURITY)
    // Grab the IP address from the request headers
    const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
    const now = Date.now();
    const windowMs = 60 * 1000; // 60 seconds

    if (rateLimitMap.has(ip)) {
      const lastRequestTime = rateLimitMap.get(ip)!;
      if (now - lastRequestTime < windowMs) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a minute." },
          { status: 429 }, // 429 is the universal HTTP status for "Too Many Requests"
        );
      }
    }
    // Log their IP and the current time
    rateLimitMap.set(ip, now);

    // 2. PARSE THE BODY
    const rawText = await request.text();
    if (!rawText) {
      return NextResponse.json(
        { error: "Empty request body." },
        { status: 400 },
      );
    }

    const body = JSON.parse(rawText);
    const { name, email, phone, projectType, details, subject_honey } = body;

    // 3. THE HONEYPOT (BOT TRAP)
    // If a bot filled out that hidden input from your frontend, we fake a success response.
    if (subject_honey) {
      console.log(`Spam bot blocked from IP: ${ip}`);
      return NextResponse.json(
        { message: "Sent successfully!" },
        { status: 200 },
      );
    }

    if (!name || !email || !projectType || !details) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // 4. SEND THE EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Project Inquiry: ${name} - ${projectType.toUpperCase()}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> <span style="text-transform: capitalize;">${projectType}</span></p>
        <br/>
        <h3>Project Details:</h3>
        <p style="white-space: pre-wrap;">${details}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
