"use client";

import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useState, FC } from "react";

type GroupLayoutPropsType = {
  group: {
    name: string;
    desc?: string;
    link: string;
    action?: string;
    image?: string;
  };
};

const GroupModal: FC<GroupLayoutPropsType> = ({ group }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {/* modal component */}
      <AnimatePresence>

      {showModal && (
        <motion.div 
        key="groupmodal"
        initial={{y: "100%"}}
        animate={{y: 0}}
        exit={{y: "100%"}}
        transition={{duration: 0.5, ease: easeOut}}
        
        className="fixed inset-0 w-full h-[100vh] z-[100] flex justify-center">
          <div
            className={`w-[90%] absolute bottom-0 bg-white ring-4 shadow-2xl h-[85vh] p-3`}
            style={{
              borderTopLeftRadius: "40px",
              borderTopRightRadius: "40px",
            }}
          >
            <div className="absolute right-4">

            <button onClick={() => setShowModal(false)}>close</button>
            </div>
            {/* form */}
            <div className="mt-5 flex flex-col items-center justify-center h-[86%] overflow-auto">
            <h2 className="font-bold text-xl">{group.name} Registration Form</h2>
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
