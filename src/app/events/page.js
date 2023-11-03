import React from 'react'
import Footer from '@/components/Footer';

export const metadata = {
  title: "Events",
  description: "Page where informations on past, upcoming and recurring Events are disseminated",
};


const Page = () => {
  return (
    <>
      <div className="mt-[80px] min-h-[400px]">
        <section className="p-2">
          <h5 className="text-blue-900">Upcoming Events</h5>
          <h5 className="text-blue-900">Recurring Events</h5>
          <h5 className="text-blue-900">Past Events</h5>
        </section>
      </div>
      ;
      <Footer />
    </>
  );
 
}

export default Page