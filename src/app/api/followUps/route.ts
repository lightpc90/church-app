
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Twilio } from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioClient = new Twilio(accountSid, authToken);

export async function GET() {
  try {
    const data = await prisma.followUp.findMany();
    return NextResponse.json({data, message: "data fetched", success: true});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Save the form data to the FollowUp table
    const created = await prisma.followUp.create({
      data
    });

    // // Send WhatsApp message using Twilio
    // const message = await twilioClient.messages.create({
    //   from: "whatsapp:+14155238886", // Twilio sandbox WhatsApp number
    //   to: "whatsapp:+<Your-WhatsApp-Number>", // Replace with your WhatsApp number
    //   body: `New Follow-up Submission:
    //   Name: ${name}
    //   Phone: ${phone}
    //   Email: ${email}
    //   Address: ${address}`,
    // });

    return NextResponse.json({data: created, success: true, message: "data created" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
