"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/globalState";



const EventEditModal = ({ event, setIsOpen }) => {
  const { events, setEvents } = useAuth();

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    eventImage: event.eventImage,
    eventName: event.eventName,
    eventOccurrence: event.eventOccurrence,
    eventRegLink: event.eventRegLink,
    eventDate: event.eventDate,
    eventTime: event.eventTime,
  });
  const handleCheckButton = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const editEvent = async () => {
    setLoading(true);
    const res = await fetch("/api/webContentsManagement/updateEvent", {
      method: "POST",
      headers: { "Content-Type": "json/application" },
      body: JSON.stringify({ _id: event._id, doc: formData }),
    });
    const updatedEvent = await res.json();
    if (!res.ok) {
      toast.error("something went wrong! Try again");
    } else if (!updatedEvent.success) {
      toast.error(updatedEvent.error);
    } else if (updatedEvent.success) {
        setEvents([...events, updatedEvent.data])
      toast.success(updatedEvent.message);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 gap-2 px-5 py-10 w-full md:w-[400px]">
      <h4 className="text-center">Edit Event</h4>
      <div className="flex flex-col gap-2 w-64">
        <p>Event Flier</p>
        <form className="flex flex-col gap-2">
          <input
            type="file"
            onChange={(e) =>
              setFormData({
                ...formData,
                eventImage: e.target.files[0],
              })
            }
          />
          <div className="flex gap-1 font-bold text-xl text-slate-400">
            <p>Mark this box if it is a recurring Event</p>
            <input
              checked={isChecked}
              onChange={handleCheckButton}
              type="checkbox"
              className="h-7 w-7 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
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
          {isChecked && (
            <div className="flex flex-col">
              <input
                onChange={(e) => {
                  setFormData({ ...formData, eventOccurrence: e.target.value });
                }}
                className="px-2 py-1 rounded-md text-black"
                id="eventOccurrence"
                type="text"
                value={formData.eventOccurrence}
                placeholder="Event Occurrence Description"
              />
              <label className="text-sm text-gray-300">
                Example: Every 1st Sunday of The Month
              </label>
            </div>
          )}
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
          {!isChecked && (
            <div>
              <div className="flex flex-col">
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
            </div>
          )}
          <div className="flex flex-col">
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
        <div className="flex flex-wrap justify-between items-center">
          <button
            disabled={loading}
            className="bg-[red] hover:bg-[pink] py-1 rounded-xl shadow-xl px-3"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] rounded-xl shadow-xl px-3 py-1"
            onClick={editEvent}
          >
            {loading ? "Publishing..." : "Update Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventEditModal;
