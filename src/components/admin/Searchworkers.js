import { useEffect, useState } from "react";
import { useAuth } from "@/context/globalState";
import toast from "react-hot-toast";
import FilteredResultLayout from "./layouts/FilteredResultLayout";

import AvatarImage from "../avatarImage";

const Searchworkers = () => {
  const avatar = AvatarImage("");
  const { users, setUsers } = useAuth();
  const [filteredResult, setFilteredResult] = useState([]);

  const [searchTerm, setSearchTerm] = useState();

  const fetchUsers = async () => {
    console.log("fetching users...");
    const res = await fetch("/api/user/fetchAllUsers");
    const fetchedUsers = await res.json();
    if (fetchedUsers.success) {
      setUsers(fetchedUsers.data);
      console.log("users fetched successfully");
    } else {
      toast.error(fetchUsers.error);
    }
  };

  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, []);

  const buttonSearch = (property) => {
    const _filteredResult = users?.filter((user) => {
      return user["dept"] === property;
    });
    console.log("_filteredResult: ", _filteredResult);
    setFilteredResult(_filteredResult);
  };

  const boxSearch = (e) => {
    setSearchTerm(e.target.value);

    const filteredUsers = users?.filter((user) => {
      return (
        user?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredResult(filteredUsers);
  };

  return (
    <div>
      {/* Dept buttons to search for workers in each department*/}
      <section className="flex gap-2 overflow-auto my-5 text-white font-medium">
        <button
          onClick={() => {
            buttonSearch("Media and Tech");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:bg-slate-500"
        >
          Media&Tech
        </button>
        <button
          onClick={() => {
            buttonSearch("Choir");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Choir
        </button>
        <button
          onClick={() => {
            buttonSearch("Sunday School");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Sunday School
        </button>
        <button
          onClick={() => {
            buttonSearch("Protocol");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Protocol
        </button>
        <button
          onClick={() => {
            buttonSearch("Jesus Police");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Jesus Police
        </button>
        <button
          onClick={() => {
            buttonSearch("Teens/Children Teaching");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Protocol
        </button>
        <button
          onClick={() => {
            buttonSearch("Ushering");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Ushering
        </button>
        <button
          onClick={() => {
            buttonSearch("Prayer");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Prayer
        </button>
        <button
          onClick={() => {
            buttonSearch("Teens/Children");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Children Dept
        </button>
        <button
          onClick={() => {
            buttonSearch("Minister");
          }}
          className="py-1 px-2 bg-[#070749] rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500"
        >
          Ministers
        </button>
      </section>
      {/* search box to search each worker */}
      <section className="flex justify-center items-center">
        <input
          value={searchTerm}
          onChange={(e)=>boxSearch(e)}
          type="text"
          placeholder="Search for a worker by name"
          className="mb-2 py-1 px-2 lg:py-2 lg:px-3 rounded-md w-[300px] lg:w-[500px] border-2 border-[#04042b] text-black"
        />
      </section>
      {/* section to display the search result */}
      <section className="flex flex-col p-2 gap-2 mb-2 min-h-[300px] max-h-[600px]  text-white overflow-auto border-2 rounded-xl border-[#04042b]">
        {filteredResult?.length !== 0 ? (
          filteredResult?.map((item, index) => {
            return <FilteredResultLayout key={index} item={item} />;
          })
        ) : (
          <p className="flex justify-center items-center">
            Searched Workers show here
          </p>
        )}
      </section>
    </div>
  );
};

export default Searchworkers;
