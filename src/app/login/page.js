import React from 'react'
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Login",
  description: "App login page",
};


const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[80px] min-h-[400px]">
        <h4>Login Page</h4>
        <LoginForm />
        <p>
          Not a Registered member?{" "}
          <span>
            <Link className="font-bold" href="/registration">
              Register
            </Link>
          </span>
        </p>
      </div>
      <Footer/>
    </>
  );
}

export default Page