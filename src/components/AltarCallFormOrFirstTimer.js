import React from 'react'

const AltarCallFormOrFirstTimer = () => {
  const [isAltarCall, setIsAltarCall] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
    })

    const handleSubmit = (e) => {
      // submit form data to the server here...
      e.preventDefault()
    }
  return (
    <div>
      <div className="flex justify-around">
        <p onClick={() => setIsAltarCall(false)}>First Timer Form</p>
        <p onClick={() => setIsAltarCall(true)}>Altar Call Form</p>
      </div>
      {isAltarCall ? <h6>Altar Call Form</h6> : <h6>First Timer Form</h6>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 pt-5 md:w-[400px]"
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

        <button
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-slate-950 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AltarCallFormOrFirstTimer