const UserProfile = ()=>{
  return (
    <div className="h-screen flex-col w-full p-4 max-w-[1200px]">
      {/* profile picture and name */}
      <section className="flex gap-2 items-center justify-between">
        <div>Back</div>
        <h3>My Profile</h3>
        <div>Settings</div>
      </section>
      <section className="flex items-center gap-4 mt-12 inline-block">
        <div className="h-[80px] w-[80px] rounded-full bg-gray-800">
          
        </div>
        <div className="flex flex-col ">
          <h1 className="text-xl font-bold">John Doe</h1>
          <span>johndoe@gmail.com</span>
        <button className="text-xs text-white mt-2 w-fit bg-sky-700 p-1 rounded-md">Edit Profile</button>
        </div>
      </section>
      {/* basic info */}
      <h3 className="mt-12 mb-3 text-xs text-sky-500">Basic Info</h3>
      <section className="text-sm inline-block text-gray-500 gap-2 flex flex-col">
        <div>Phone: <span className="text-gray-800">+234 904 6470</span></div>
        <div>Gender: <span className="text-gray-800">Female</span></div>
        <div>DOB: <span className="text-gray-800">17th, Oct</span></div>
      </section>
      <div className="w-full h-[1px] bg-gray-500 mt-6"/>
      {/* Extended info */}
      <h3 className="mt-6 mb-3 text-xs text-sky-500">Extended Info</h3>
      <section className="text-sm text-gray-500 flex flex-col gap-2">
        <div>Dept: <span className="text-gray-800">Media & Tech.</span></div>
        <div>House Fellowship: <span className="text-gray-800">Glory Center</span></div>
        <div>House Address: <span className="text-gray-800">1, David Ave. Lakowe</span></div>
      </section>
    </div>
  )
}
export default UserProfile