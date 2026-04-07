import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    })
    
    // Clear the HTTP-Only token cookie
    response.cookies.set("token", "", { 
      httpOnly: true, 
      expires: new Date(0),
      path: "/"
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
