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
        <p className='p-3'>Please enter your email/phone and password to login to the app.</p>
        <div className="bg-white p-5 my-5 rounded-md shadow-md ring-2 ring-slate-500">
          <LoginForm />
        </div>

        <p>
          Not a Registered member?{" "}
          <span>
            <Link className="font-bold" href="/registration">
              Register
            </Link>
          </span>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Page