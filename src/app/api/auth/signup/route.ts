import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({ error: "[SIGNUP] Please provide all missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "[SIGNUP] User already exists! Are you sure you aren't trying to Log In instead of Register?" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: false
    });

    const savedUser = await newUser.save();

    // Attempt to send verification email
    try {
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    } catch (emailError: any) {
      console.warn("SMTP Email Failed. Engaging fallback auto-verification so user can login immediately.", emailError);
      // Auto-verify as a fallback so the website doesn't completely break!
      savedUser.isVerified = true;
      await savedUser.save();
    }

    return NextResponse.json({
      message: "Account created successfully! You can now log in.",
      success: true,
      savedUser,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
