"use client";

import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useState, FC } from "react";
import { LuPanelBottomClose } from "react-icons/lu";

type GroupLayoutPropsType = {
  group: {
    name: string;
    desc?: string;
    link: string;
    action?: string;
    image?: string;
  };
};

const formInitial = {
  fullname: "",
  phone: "",
  email: "",
  gender: "",
  dob: Date.now(),
};

const GroupModal: FC<GroupLayoutPropsType> = ({ group }) => {
  let genderInput;
  if (group.name === "Good Women" || group.name === "Excellent Men") {
    genderInput = false;
  } else genderInput = true;

  const childrenReg = group.name === "Children Ministry";
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(formInitial);
  return (
    <div>
      {/* modal component */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="groupmodal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="fixed inset-0 w-full h-[100vh] z-[100] flex justify-center"
          >
            <div
              className={`w-full max-w-[600px] absolute bottom-0 lg:right-[50%] lg:translate-x-[50%] lg:top-[50%] 
                lg:translate-y-[-50%]  bg-slate-950 text-white 
                lg:rounded-[40px]
                ring-4 shadow-2xl h-[85vh] p-3 lg:px-10`}
              style={{
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
              }}
            >
              <div className="absolute right-4">
                <button onClick={() => setShowModal(false)}>
                  <LuPanelBottomClose size={25} className=" text-blue-500" />
                </button>
              </div>
              <h2 className="font-semibold mb-5 text-center">
                Groups and Ministries Database Form
              </h2>
              <h2 className="font-bold text-xl text-center">
                {group.name} Registration Form
              </h2>
              <div className="flex flex-col gap-2 justify-center h-[83%] overflow-auto">
                {childrenReg ? (
                  <p className="text-blue-900 font-semibold">
                    Parent/Guadian Details Section
                  </p>
                ) : (
                  <p className="text-blue-900 font-semibold">
                    Kindly fill your details below
                  </p>
                )}
                {/* form */}
                <div className="space-y-4">
                  {/* full name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullname}
                      placeholder="John David"
                      required
                      className="p-2 border-l-4 border-blue-800 bg-inherit"
                    />
                  </div>
                  {/* full name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="number"
                      value={formData.phone}
                      placeholder="1234567890"
                      required
                      className="p-2 border-l-4 border-blue-800 bg-inherit"
                    />
                  </div>
                  {/* email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      placeholder="example@gmail.com"
                      className="p-2 border-l-4 border-blue-800 bg-inherit "
                    />
                  </div>
                  {/* gender */}
                  {genderInput && (
                    <div className="flex flex-col gap-1">
                      <label htmlFor="gender">Gender</label>
                      <div className="flex gap-5">
                        <label className="flex items-center font-semibold gap-2">
                          Male
                          <input
                            type="radio"
                            value="male"
                            name="gender"
                            required
                          />
                        </label>
                        <label className="flex items-center font-semibold gap-2">
                          Female
                          <input type="radio" value="female" name="gender" />
                        </label>
                      </div>
                    </div>
                  )}
                  <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
                  {/* children details section */}

                  {childrenReg && (
                    <div className="flex flex-col gap-3">
                      <p className=" text-blue-900 font-semibold">{`Child's Details Section`}</p>
                      {/* full name */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullname">{`Full Name`}</label>
                        <input
                          type="text"
                          value={formData.fullname}
                          placeholder="John David"
                          required
                          className="p-2 border-l-4 border-blue-800 bg-inherit"
                        />
                      </div>
                      {/* gender */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="gender">Gender</label>
                        <div className="flex gap-5">
                          <label className="flex items-center font-semibold gap-2">
                            Male
                            <input
                              type="radio"
                              value="male"
                              name="gender"
                              required
                            />
                          </label>
                          <label className="flex items-center font-semibold gap-2">
                            Female
                            <input type="radio" value="female" name="gender" />
                          </label>
                        </div>
                      </div>
                      {/* DOB */}
                      <div className="flex gap-4 items-center flex-wrap">
                        <label htmlFor="dob">Date of Birth</label>
                        <input name="dob" type="date" value={formData.dob}
                        className="text-slate-900 rounded-md px-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* submit */}
                  <button className="mt-10 inline-block bg-blue-800 hover:bg-blue-700 p-2 text-white rounded-md">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-950 px-2 py-1 shadow-xl text-white rounded-md"
      >
        {group.action}
      </button>
    </div>
  );
};

export default GroupModal;
