'use client'

import React, { useState } from "react";
import EventEditModal from "./EventEditModal";
import EventDeleteModal from "./EventDeleteModal";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const EventListLayout = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <div className="relative flex flex-wrap justify-between gap-3 items-center bg-gray-800 p-2">
      <div className="font-semibold">{event.eventName}</div>
      <div className="flex flex-wrap gap-2">
        <div
          className="text-[yellow] hover:cursor-pointer px-1"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <AiFillEdit />
        </div>
        <div className="text-[red] hover:cursor-pointer px-1 "
        onClick={()=>{setDeleteModalOpen(true)}}>
          <RiDeleteBin6Fill />
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center bg-gray-400 opacity-95 justify-center z-50">
          <EventEditModal event={event} setIsOpen={setIsOpen} />
        </div>
      )}
      {deleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center bg-gray-400 opacity-95 justify-center z-50">
          <EventDeleteModal event={event} setDeleteModalOpen={setDeleteModalOpen} />
        </div>
      )}
    </div>
  );
};

export default EventListLayout;
