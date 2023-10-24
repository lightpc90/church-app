import profile from "../user/profile"

const Searchworkers = () => {
  return (
    <div>
      {/* Dept buttons to search for workers in each department*/}
      <section className="flex gap-2 overflow-auto my-5">
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:bg-slate-500">
          Media&Tech
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Choir
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Sunday School
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Protocol
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Ushering
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Prayer
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Children Dept
        </button>
        <button className="py-1 px-2 bg-[#070749] text-white font-medium rounded-md shadow-md hover:text-slate-950 hover:bg-slate-500">
          Ministers
        </button>
      </section>
      {/* search box to search each worker */}
      <section className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a worker by name"
          className="mb-2 py-1 px-2 rounded-md w-[300px] border-2 border-[#04042b]"
        />
      </section>
      {/* section to display the search result */}
      <section className="flex flex-col mb-2 h-[200px] justify-center items-center overflow-auto border-2 rounded-xl border-[#04042b]">
        Search result shows here
      </section>
    </div>
  );
}

export default Searchworkers