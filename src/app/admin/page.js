import Profile from "@/components/user/profile"
import Searchworkers from "@/components/admin/Searchworkers"
import RegisterForm from "@/components/RegisterForm";
import UpdateSlider from "@/components/admin/updateSlider";
import AltarCallFormOrFirstTimer from "@/components/AltarCallFormOrFirstTimer";
import UpdateGallery from "@/components/admin/UpdateGallery";
import UpdateEvents from "@/components/admin/UpdateEvents";
import ViewAttendance from "@/components/admin/ViewAttendance";
import ViewPrayerReqest from "@/components/admin/ViewPrayerReqest";
import ViewTestimonies from "@/components/admin/ViewTestimonies";

const Page = () => {
    return (
      <div className="mt-[80px] mx-[20px] md:mx-[70px]">
        <h4>Admin Dashboard</h4>
        <h6 className="text-[#666674]">Church Database Management</h6>

        {/* profile section card*/}
        <section className="bg-[#060633] px-10 rounded-xl shadow-xl text-white">
          <Profile />
        </section>

        {/* search workers */}
        <section className="flex flex-col justify-center items-center my-2">
          <h6>Manage Users</h6>
          <div className="bg-[#1e3a8a] mb-2 p-5 rounded-xl shadow-xl text-white w-full">
            <Searchworkers />
          </div>
        </section>

        {/* Register a User */}
        <section className="flex flex-col justify-center items-center my-2">
          <h6>Register a User</h6>
          <div className="bg-[#2e074b] p-5 rounded-xl shadow-xl w-full">
            <RegisterForm />
          </div>
        </section>

        {/* Register Altar Call or First Timer */}
        <section className="flex flex-col justify-center items-center my-2">
          <h6>Follow Up Management</h6>
          <div className="bg-[#2e074b] p-5 rounded-xl shadow-xl w-full">
            <AltarCallFormOrFirstTimer />
          </div>
        </section>

        {/* Manage website contents */}
        <section className="flex flex-col justify-center gap-2 items-center my-2">
          <h6>Website Contents Management</h6>
          <div className="bg-[#172554] p-5 rounded-xl shadow-xl w-full">
            <UpdateSlider />
          </div>
          <div className="bg-[#172554] p-5 rounded-xl shadow-xl w-full">
            <UpdateGallery />
          </div>
          <div className="bg-[#172554] p-5 rounded-xl shadow-xl w-full">
            <UpdateEvents />
          </div>
        </section>
        {/* Testimonies and prayer request views section */}
        <section className="flex flex-col justify-center gap-2 items-center my-2">
          <h6>Testimonies and Prayer Requests</h6>
          <div className="bg-[#172554] p-5 rounded-xl shadow-xl w-full">
            <ViewTestimonies />
          </div>
          <div className="bg-[#172554] p-5 rounded-xl shadow-xl w-full">
            <ViewPrayerReqest />
          </div>
        </section>
        {/* Attendance view section */}
        <section className="flex flex-col justify-center gap-2 items-center my-2">
          <ViewAttendance/>
        </section>
      </div>
    );
}

export default Page