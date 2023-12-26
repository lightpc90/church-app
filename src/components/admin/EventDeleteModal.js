"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/globalState";
import toast from "react-hot-toast";

const EventDeleteModal = ({ event, setDeleteModalOpen }) => {
  const { events, setEvents } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const deleteEvent = async () => {
    setLoading(true);
    const res = await fetch("/api/webContentsManagement/deleteEvent", {
      method: "POST",
      headers: { "Content-Type": "json/application" },
      body: JSON.stringify({ _id: event._id}),
    });
    const deleted = await res.json();
    if (!res.ok) {
      toast.error("something went wrong! Try again");
    } else if (!deleted.success) {
      toast.error(deleted.error);
    } else if (deleted.success) {
      const remainingEvents = events.filter((item)=>(item._id !== event._id))
      setEvents(remainingEvents);
      toast.success(deleted.message);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 gap-2 px-5 py-10 w-full md:w-[400px]">
      <div className="flex flex-col gap-2">
              <h5>{ event.eventName}</h5>
        <p>Are you sure you want to delete this event?</p>

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
            onClick={deleteEvent}
          >
            {loading ? "Deleting..." : "Delete Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDeleteModal;
