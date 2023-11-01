'use client'
import TimerOrButton from '@/components/TimerOrButton'
import Footer from '@/components/Footer';

const Page = () => {
  
  return (
    <>
      <div className="mt-[80px] flex flex-col justify-center items-center">
        <h5>Workers Attendance Page</h5>
        <TimerOrButton />
      </div>
      <Footer/>
    </>
  );
}

export default Page