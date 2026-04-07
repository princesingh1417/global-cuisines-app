import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json({ error: "Please enter your email" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal to attacker if account exists
      return NextResponse.json({ message: "If an account exists, a reset link will be sent to the email." }, { status: 200 });
    }

    // Attempt to send reset email
    try {
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    } catch (emailError: any) {
       console.warn("SMTP Email Failed on Forgot Password route.", emailError);
       // We still return 200 to prevent exposing that the email system is down to end users.
    }

    return NextResponse.json({
      message: "If an account exists, a reset link will be sent to the email.",
      success: true,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
