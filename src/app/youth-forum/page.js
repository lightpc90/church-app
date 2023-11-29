import React from 'react'
import Footer from '@/components/Footer';

export const metadata = {
  title: "Youth Forum",
  description: "Page for Youth and Young Adults",
};


const Page = () => {
  const footer = Footer()
  return (
    <>
      {" "}
      <div className="mt-[80px] min-h-[400px]">
        <div className="flex flex-col justify-center items-center gap-2 p-3">
          <h3>Youth Forum</h3>
          {/* <p>The youth forum is a place where young people can come together to discuss issues that affect them. It provides an opportunity for young people</p> */}
          <p>
            Featuring: Readers Club, Live Chat, Contest, Book Review, E-libary,
            Awards and Rewards.
          </p>
          <h4>Watch Out!</h4>
        </div>
      </div>
      <footer>{footer}</footer>
    </>
  );
}

export default Page