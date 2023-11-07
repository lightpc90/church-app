import React from 'react'
import Footer from '@/components/Footer';
import EventCardLayout from '@/components/event/EventCardLayout';

export const metadata = {
  title: "Events",
  description: "Page where informations on past, upcoming and recurring Events are disseminated",
};


const Page = () => {
  return (
    <>
      <div className="mt-[80px] min-h-[400px] ">
        <section className="w-screen p-5 flex flex-col justify-center items-center ">
          <div className="w-screen mt-10">
            <h5 className="text-center">Upcoming Events</h5>
          </div>
          <div className="w-screen mt-10">
            <h5 className="text-center">Recurring Events</h5>
            <div className="flex flex-wrap justify-center w-screen">
              <EventCardLayout />
            </div>
          </div>
          <div className="w-screen mt-10">
            <h5 className="text-center">Past Events</h5>
          </div>
        </section>
      </div>
      ;
      <Footer />
    </>
  );
 
}

export default Page