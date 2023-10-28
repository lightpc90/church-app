'use client'

import { useState } from 'react'

const UpdateSlider = () => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileInputChange = (e) => { 
        setSelectedFile(URL.createObjectURL(e.target.files[0]))
    }

    const handleUpload = () => {
        // upload logic here
        console.log("Image upload button clicked")
    }

  return (
    <div className="flex flex-col gap-4 justify-center items-center  text-white w-full">
      <h6>Update Slider Images Here</h6>
      <section className="flex flex-col gap-2 w-full">
        <input type="file" onChange={handleFileInputChange} />
        <button
          className="bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] py-1 rounded-xl shadow-xl"
          onClick={handleUpload}
        >
          Upload
        </button>
      </section>
      {/* section to display the search result */}
      <p>Slider Images</p>
      <section className="flex flex-col mb-2 h-[200px] justify-center items-center overflow-auto border-2 rounded-xl border-[#04042b] w-full">
        Existing Images show here
      </section>
    </div>
  );
}

export default UpdateSlider