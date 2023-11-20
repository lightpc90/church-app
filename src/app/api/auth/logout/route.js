
import { NextResponse } from 'next/server'
import { addTokenToBlacklist } from '@/middlewares/addTokenToBlackList'

export async function POST(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")){return NextResponse.json(
    { success: false, error: "no access token/does not start with Bearer" },
    { status: 401 }
  );}
        
  const token = authHeader.split(" ")[1];
  //invalidate access token
  addTokenToBlacklist(token);
  res.status(204).json({success: true, message: "You are successfully logged out" }, {status: 200});
}