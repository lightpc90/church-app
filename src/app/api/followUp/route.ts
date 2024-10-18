// app/api/followup/route.ts

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { Twilio } from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioClient = new Twilio(accountSid, authToken);

// export async function POST(req: Request) {
//   try {
//     const { name, phone, email, address } = await req.json();

//     // Save the form data to the FollowUp table
//     const followUp = await prisma.followUp.create({
//       data: { name, phone, email, address }
//     });

//     // Send WhatsApp message using Twilio
//     const message = await twilioClient.messages.create({
//       from: "whatsapp:+14155238886", // Twilio sandbox WhatsApp number
//       to: "whatsapp:+<Your-WhatsApp-Number>", // Replace with your WhatsApp number
//       body: `New Follow-up Submission:
//       Name: ${name}
//       Phone: ${phone}
//       Email: ${email}
//       Address: ${address}`,
//     });

//     return NextResponse.json({ followUp, message });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
