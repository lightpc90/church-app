import React from 'react'
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';

export const metadata = {
  title: "Registration",
  description: "Page to register new member",
};


const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[80px] min-h-[400px]">
      <h4>Registration Page</h4>
      <RegisterForm />
      <p>
        Already Registered?{" "}
        <span>
          <Link className='font-bold' href='/login'>Login</Link>
        </span>
      </p>
    </div>
  );
}

export default Page