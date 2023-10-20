import React from 'react'
import RegisterForm from '@/components/RegisterForm';

export const metadata = {
  title: "Registration",
  description: "Page to register new member",
};


const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[80px] min-h-[400px]">
      <div>Register Page</div>
      <RegisterForm/>
    </div>);
}

export default Page