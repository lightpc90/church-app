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
    <div className="flex flex-col gap-4 justify-center items-center  text-white w-full">
      <h6>Update/Add Events</h6>
      <section className="flex flex-col gap-2 w-full">
        <p>Upload Event Flier</p>
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
        <div className="flex gap-2">
          <p>Choose Event Date</p>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => {
              setFormData({ ...formData, eventDate: e.target.value });
            }}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-black"
          />
        </div>
        <div className="flex gap-2">
          <p>Choose Event Time</p>
          <input
            type="time"
            value={formData.eventTime}
            onChange={(e) => {
              setFormData({ ...formData, eventTime: e.target.value });
            }}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-black"
          />
        </div>

        <button
          className="bg-[blue] py-1 rounded-xl shadow-xl"
          onClick={handleSubmit}
        >
          Publish Event
        </button>
      </section>
      {/* section to display the search result */}
      <p>Events List</p>
      <section className="flex flex-col mb-2 h-[200px] justify-center items-center overflow-auto border-2 rounded-xl border-[#04042b] w-full">
        Existing Events show here
      </section>
    </div>
  );
};

export default UpdateEvents;
