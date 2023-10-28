'use client'

import { useState } from 'react'

const AltarCallFormOrFirstTimer = () => {
  const [isAltarCall, setIsAltarCall] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
      phone: '',
        redeemMember: '',
        email: '',
      address: '',
        gender: '',
    })

    const handleSubmit = (e) => {
      // submit form data to the server here...
      e.preventDefault()
    }
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="flex gap-10 my-5">
        <p onClick={() => setIsAltarCall(false)}>First Timer Form?</p>
        <p onClick={() => setIsAltarCall(true)}>Altar Call Form?</p>
      </div>
      {isAltarCall ? <h6>Altar Call Form</h6> : <h6>First Timer Form</h6>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 pt-5 w-full md:w-[400px] text-black"
      >
        <input
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
          className="px-2 py-1 rounded-md"
          id="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First Name"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
          className="px-2 py-1 rounded-md"
          id="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Last Name"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
          className="px-2 py-1 rounded-md"
          id="phone"
          type="number"
          value={formData.phone}
          placeholder="Phone Number"
          required
        />
        {!isAltarCall && (
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
            value={formData.redeemMember}
            onChange={(e) => {
              setFormData({ ...formData, redeemMember: e.target.value });
            }}
          >
            <option value="">Are You a Redeem Member?</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        )}
        <input
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="px-2 py-1 rounded-md"
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          className="px-2 py-1 rounded-md"
          id="address"
          type="text"
          value={formData.address}
          placeholder="Residential Address"
        />
        <select
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
          value={formData.gender}
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
        >
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <button
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#082f49] to-[#f9a8d4] hover:from-[#a5b4fc] hover:to-[#172554] text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AltarCallFormOrFirstTimer