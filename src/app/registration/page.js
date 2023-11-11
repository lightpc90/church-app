import React from 'react'
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Registration",
  description: "Page to register new member",
};


const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[80px] min-h-[400px]">
        <h4>Registration Page</h4>

        <span>
          <Link className='font-semibold text-[blue]' href="/login" passHref={true}>
            Login here
          </Link>{" "}
          if you're a registered member
        </span>
        <p className="px-3 mt-5 font-semibold">
          You can choose to register with either email or phone number
        </p>
        <div className="bg-white p-5 my-5 rounded-md shadow-md ring-2 ring-slate-500">
          <RegisterForm />
        </div>
        <p>
          Already Registered?{" "}
          <span>
            <Link className="font-bold" href="/login">
              Login
            </Link>
          </span>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Page