// 'use client'

// import {useState, useEffect} from 'react'
import Footer from '@/components/Footer';
import PastEvents from '@/components/event/PastEvents';
import RecurringEvents from '@/components/event/RecurringEvents';
import UpcomingEvents from '@/components/event/UpcomingEvents';

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
            <h5 className="text-center lg:text-2xl mb-2">Upcoming Events</h5>
            <UpcomingEvents />
          </div>
          <div className="w-screen mt-10">
            <h5 className="text-center lg:text-2xl mb-2">Recurring Events</h5>
            <RecurringEvents />
          </div>
          <div className="w-screen mt-10">
            <h5 className="text-center">Past Events</h5>
            <PastEvents />
          </div>
        </section>
      </div>
      ;
      <Footer />
    </>
  );
 
}

export default Page