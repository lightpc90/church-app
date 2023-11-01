"use client";

import { useState } from "react";

const UpdateEvents = () => {
  
    const [formData, setFormData] = useState({
      eventImage: null,
      eventName: '',
      eventDescription: '',
      eventRegLink: '',
      eventDate: new Date(),
      eventTime: new Date().getTime()
        
    })

  const handleSubmit = () => {
    // upload logic here
    console.log("Published Event", formData);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center text-white">
      <h6 className="w-full text-center">Update/Add Events</h6>
      
        <div className="flex flex-col gap-2 w-64">
          <p>Event Flier</p>
          <form className="flex flex-col gap-2">
            <input
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  eventImage: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <input
              onChange={(e) => {
                setFormData({ ...formData, eventName: e.target.value });
              }}
              className="px-2 py-1 rounded-md text-black"
              id="eventName"
              type="text"
              value={formData.eventName}
              placeholder="Event Name"
              required
            />
            <input
              onChange={(e) => {
                setFormData({ ...formData, eventDescription: e.target.value });
              }}
              className="px-2 py-1 rounded-md text-black"
              id="eventDescription"
              type="text"
              value={formData.eventDescription}
              placeholder="Event Description"
            />
            <input
              onChange={(e) => {
                setFormData({ ...formData, eventRegLink: e.target.value });
              }}
              className="px-2 py-1 rounded-md text-black"
              id="eventRegLink"
              type="text"
              value={formData.eventRegLink}
              placeholder="Event Registration Link"
            />
            <div className="flex flex-wrap gap-2">
              <p>Choose Event Date</p>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => {
                  setFormData({ ...formData, eventDate: e.target.value });
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-black"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <p>Choose Event Time</p>
              <input
                type="time"
                value={formData.eventTime}
                onChange={(e) => {
                  setFormData({ ...formData, eventTime: e.target.value });
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-black"
              />
            </div>
          </form>

          <button
            className="bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] py-1 rounded-xl shadow-xl"
            onClick={handleSubmit}
          >
            Publish Event
          </button>
        </div>
      

      {/* section to display the search result */}
      <div className="flex flex-col grow">
        <p>Events List</p>
        <section className="flex flex-col mb-2 h-[200px] justify-center items-center overflow-auto border-2 rounded-xl border-[#04042b]">
          Existing Events show here
        </section>
      </div>
    </div>
  );
};

export default UpdateEvents;
