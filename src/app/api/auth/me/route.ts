import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });
        
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET || "SUPER_SECRET_FALLBACK_KEY");
        return NextResponse.json({ data: decodedToken });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
