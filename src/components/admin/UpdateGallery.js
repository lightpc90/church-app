"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const UpdateGallery = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    //  I don't want this upload component to work yet.. It's only set up for not for future integration
    // this two lines will be removed when it's time
    toast.error("This feature not activated yet");
    return;

    // if no file selected
    if (!selectedFile) {
      toast.error("Please choose a file");
      return;
    }
    // create an instance of FormData
    const formData = new FormData();
    // append the documents
    formData.append("file", selectedFile);
    formData.append("upload_preset", "beautifulGatePreset");
    console.log("formData: ", ...formData);
    
    // upload file to cloudinary
    console.log("Image upload button clicked");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/gideonabbey/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.secure_url);
      console.log("data returned: ", data.secure_url);

      // grab the secure url returned from the uploaded file and save to the DB
      // connect to the new_gallery api


    } else {
      // if file failed to upload to cloudinary
      console.log("Error: ", res.status);
      toast.error("Image failed to upload: Try again");
      return;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center  text-white w-full">
      <h6>Update Gallery Images Here</h6>
      <section className="flex flex-col gap-2 w-full">
        <input type="file" onChange={handleFileInputChange} />
        <button
          className="bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] py-1 rounded-xl shadow-xl"
          onClick={handleUpload}
        >
          {loading ? "Loading..." : "Upload"}
        </button>
      </section>
      {/* section to display the search result */}
      <p>Gallery Images</p>
      <section className="flex flex-col mb-2 h-[200px] justify-center items-center overflow-auto border-2 rounded-xl border-[#04042b] w-full">
        Gallery Images show here
      </section>
    </div>
  );
};

export default UpdateGallery;
