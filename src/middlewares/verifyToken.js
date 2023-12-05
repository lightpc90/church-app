
const verifyToken = async (token) => {
  if (!token) return false
  console.log('accesstoken passed to the api: ', token)
const verify = await fetch("/api/auth/verifyToken", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ token }),
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

