"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/globalState";
const UploadEvent = () => {
  const { currentUserId, setEvents, events } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    eventImage: "",
    eventName: "",
    eventOccurrence: "",
    eventRegLink: "",
    eventDate: new Date(),
    eventTime: '',
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckButton = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // if no file selected
    if (!formData?.eventImage) {
      toast.error("Please choose a file");
      setLoading(false);
      return;
    }
    if (!formData?.eventName) {
      toast.error("Please provide the event name");
      setLoading(false);
      return;
    }
    if (!isChecked && (!formData?.eventDate || !formData?.eventTime)) {
      toast.error("Please provide event date and time");
      setLoading(false);
      return;
    }
    if (isChecked && !formData?.eventOccurrence) {
      toast.error("Please provide event occurrence");
      setLoading(false);
      return;
    }
    // create an instance of FormData
    const fileFormData = new FormData();
    // append the documents
    fileFormData.append("file", formData.eventImage);
    fileFormData.append("upload_preset", "beautifulGatePreset");
    console.log("formData: ", ...fileFormData);

    // upload file to cloudinary
    console.log("Image upload button clicked");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/gideonabbey/upload`,
      {
        method: "POST",
        body: fileFormData,
      }
    );
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.secure_url);
      console.log("data returned: ", data.secure_url);

      // grab the secure url returned from the uploaded file and save to the DB
      const eventData = {
        ...formData,
        eventImage: data.secure_url,
        uploadedBy: currentUserId,
      };
      console.log("eventData before sending to api: ", eventData)
      // connect to the new_event api
      const eventUpload = await fetch(
        "/api/webContentsManagement/event_upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );
      if (eventUpload.ok) {
        const eventData = await eventUpload.json();
        console.log("eventData: ", eventData);
        setEvents([...events, eventData.data]);
        toast.success(eventData.message);
        // set the eventData to the eventData state

        // set the formData to an empty object
        setFormData({
          eventName: "",
          eventDate: "",
          eventTime: "",
          eventLocation: "",
          eventOccurrence: "",
          eventImage: "",
        });
      }
      // if the event data failed to publish to the database
      else {
        toast.error(eventData.error);
      }
    } else {
      // if file failed to upload to cloudinary
      console.log("Error: ", res.status);
      toast.error("Image failed to upload: Try again");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center text-white">
      <h6 className="w-full text-center font-bold lg:text-2xl">
        Publish Events
      </h6>

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
          <div className="flex gap-1 font-bold text-xl text-slate-800">
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
            </div>
          )}
        </form>

        <button
          disabled={loading}
          className="bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] py-1 rounded-xl shadow-xl"
          onClick={handleSubmit}
        >
          {loading ? "Publishing..." : "Publish Event"}
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

export default UploadEvent;
