import React from 'react'

const Profile = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-[50px] w-[50px] rounded-full bg-white"></div>
      <div className="flex gap-[8px] items-center">
        <span className="text-lg text-slate-600">Hi,</span>
        <span className="font-bold text-lg">Fola Abbey</span>
      </div>
    </div>
  );
}

export default Profile