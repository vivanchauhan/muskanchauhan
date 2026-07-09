import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // replace after domain verification
      to: ["muskanchauhan@zohomail.in"],
      subject: `New Portfolio Inquiry from ${name}`,
      replyTo: email,

      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>New Portfolio Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <hr />

          <p><strong>Message</strong></p>

          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
