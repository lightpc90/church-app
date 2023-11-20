const jwt = require("jsonwebtoken");
import { blacklistTokens, addTokenToBlacklist } from "./addTokenToBlackList";
import { NextResponse } from "next/server";


const verifyJWT = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")){return NextResponse.json(
    {
      success: false,
      error: "Unauthorised! Bearer missing in your authorization",
    },
    { status: 401 }
  );}
    
  const token = authHeader.split(" ")[1];
  console.log(token);

  //check if the token is blacklisted
  if (blacklistTokens.includes(token)) {
    return NextResponse.json({success: false, error: 'unauthorized! Token invalid'}, {status: 401})
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return NextResponse.json({success: false, error: 'invalid token'}, {status: 403}) //invalid token
    //pass the user
    return NextResponse.json({success: true, message: 'successfully logged in', decoded}, {status: 200})
  });
};

export default verifyJWT
