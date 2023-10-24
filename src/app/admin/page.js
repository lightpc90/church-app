import Profile from "@/components/user/profile"
import Searchworkers from "@/components/admin/Searchworkers"

const Page = () => {
    return (
      <div className="mt-[80px] mx-[20px] md:mx-[70px]">
        <h4>Admin Dashboard</h4>
        {/* profile section card*/}
        <section className="bg-[#060633] px-10 rounded-xl shadow-xl text-white">
          <Profile />
        </section>
        {/* search workers */}
        <section className="flex flex-col justify-center items-center">
          <h6>Manage Users</h6>
          <section className="bg-[#1e3a8a] mb-2 p-5 rounded-xl shadow-xl text-white w-full">
            <Searchworkers />
          </section>
        </section>
      </div>
    );
}

export default Page