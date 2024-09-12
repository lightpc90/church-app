import React from "react";

const PrayerRequestForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Prayer Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="number" placeholder="08123456789" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="example@gmail.com" />
        </div>
        <div>
          <label htmlFor="address">Your Prayer Request</label>
          <textarea id="address" placeholder="Let's pray with you" />
        </div>
        <input type="submit" value="Pray With Me" />
      </form>
    </div>
  );
};

export default PrayerRequestForm;
