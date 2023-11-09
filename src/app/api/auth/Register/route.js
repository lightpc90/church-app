import connectDB from "../../../../models/connectDB";
const bcrypt = require("bcrypt");
import User from "@/models/User";


export default async function  (req, res) {
  await connectDB();
  if (req.method === 'POST') {
    
    try {
      const { phone, email, pwd, confirmPwd } = req.body;

      // check if the password and confirmPassword matches
      if (pwd !== confirmPwd) {
        return res.status(400).json({
          success: false,
          message: 'Password does does not match!'
        })
      }
    console.log(`email: ${email}, pwd: ${pwd}, phone: ${phone}`);

      // check if either email or phone is provided with password
    if (!((email || phone) && pwd))
      return res
        .status(400)
        .json({
          success: false,
          message: "Phone or Email and Password are required"
        });

      // check to see if the user already existed in the database
      let existingUser = null;
      
      // if the user registered using email
    if (email) {
      existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists."
        });
      }
      
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // Insert the new user into the database
      const newUser = await User.create({ email, hashedPwd });

      console.log("successfully registered... ", newUser);
      res.status(201).json({
        success: true,
        message: `New user created!`,
        data: newUser,
      });
    }
    
      // if the user registered using phone
    else if (phone) {
      existingUser = await User.findOne({ phone: parseInt(phone) })
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists."
        });
      }

      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // Insert the new user into the database
      const newUser = await User.create({ phone: parseInt(phone), hashedPwd });

      console.log("successfully registered... ", newUser);
      res.status(201).json({
        success: false,
        message: `New user created!`,
        data: newUser,
      });
    }

  } catch (err) {
    console.log(err);
      res.status(500).json({
      success: false,
      error: "internal server error"
    })
  }}
}

