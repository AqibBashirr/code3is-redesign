import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter cache
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // --- 1. BACKEND RATE LIMITING ---
    // Get the user's IP Address
    const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute cooldown

    if (rateLimitMap.has(ip)) {
      const lastRequestTime = rateLimitMap.get(ip)!;
      if (now - lastRequestTime < windowMs) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a minute." },
          { status: 429 }, // 429 = "Too Many Requests"
        );
      }
    }
    // Update their last request time
    rateLimitMap.set(ip, now);

    // --- PARSE BODY ---
    const rawText = await request.text();
    if (!rawText)
      return NextResponse.json(
        { error: "Empty request body." },
        { status: 400 },
      );

    const body = JSON.parse(rawText);
    const { name, email, phone, projectType, details, subject_honey } = body;

    // --- 2. THE HONEYPOT TRAP ---
    if (subject_honey) {
      // If a bot filled this out, we pretend it was successful so they go away,
      // but we DO NOT actually send the email!
      console.log(`Bot blocked from IP: ${ip}`);
      return NextResponse.json(
        { message: "Email sent successfully!" },
        { status: 200 },
      );
    }

    if (!name || !email || !projectType || !details) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // --- 3. SEND EMAIL (Same as before) ---
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
      subject: `New Project Inquiry from ${name} - ${projectType.toUpperCase()}`,
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
