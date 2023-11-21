import React from 'react'

const verifyToken = async (accessToken) => {
  if (!accessToken) return false
  console.log('accesstoken passed to the api: ', accessToken)
const verify = await fetch("api/auth/verifyToken", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ accessToken }),
});

  const res = await verify.json();
  console.log('res object: ', res)
if (res.success) {
  return true;
} else {
  return false;
}

}

export default verifyToken

