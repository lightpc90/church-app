import React from 'react'

const EventListLayout = ({event}) => {
  return (
    <div className="flex flex-wrap justify-between gap-3 items-center bg-gray-800 p-2">
          <div className='font-semibold'>{event.eventName}</div>
          <div className='flex flex-wrap gap-2'>
              <div>edit</div>
              <div>delete</div>
          </div>
    </div>
  );
}

export default EventListLayout