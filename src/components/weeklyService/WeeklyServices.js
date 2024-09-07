import Image from 'next/image';
import React from 'react'
import styles from './weeklyService.module.css'

const WeeklyServices = () => {
  return (
    <div className="bg-[#B9C4D4] w-full min-h-[600px] py-5 text-zinc-950 lg:text-2xl font-bold flex flex-col items-center relative">
      <h4 className="text-rose-200 text-sm">Worship With Us</h4>
      <h2 className="text-xl">Our Weekly Services</h2>

        <div className={styles.service}></div>    
    </div>
  );
}

export default WeeklyServices