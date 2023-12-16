'use client'

import React from 'react'
import { useAuth } from '@/context/globalState'
import EventCardLayout from './EventCardLayout'

const RecurringEvents = () => {
    const { events } = useAuth()
    const recurringEvents = events?.filter((event)=>(event.eventOccurrence))
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {recurringEvents?.map((event, i) => (
        <EventCardLayout key={i} event={event} />
      ))}
    </div>
  );
}

export default RecurringEvents