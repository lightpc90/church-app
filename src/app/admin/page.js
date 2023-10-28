import Profile from "@/components/user/profile"
import Searchworkers from "@/components/admin/Searchworkers"
import RegisterForm from "@/components/RegisterForm";
import UpdateSlider from "@/components/admin/updateSlider";
import AltarCallFormOrFirstTimer from "@/components/admin/AltarCallFormOrFirstTimer";
import UpdateGallery from "@/components/admin/UpdateGallery";
import UpdateEvents from "@/components/admin/UpdateEvents";
import ViewAttendance from "@/components/admin/ViewAttendance";
import ViewPrayerReqest from "@/components/admin/ViewPrayerReqest";
import ViewTestimonies from "@/components/admin/ViewTestimonies";

const Page = () => {
    return (
      <div className="my-[100px] md:mt-[80px] md:mb-[940px] relative flex flex-wrap justify-between gap-2 w-full">
        <div className=" md:hidden w-full p-2">
          <h4>Admin Dashboard</h4>
          <h6 className="text-[#666674]">Church Database Management</h6>
        </div>
        {/* profile section card*/}
        <section className="w-full md:absolute md:top-0 md:left-0 md:h-screen md:overflow-auto  bg-[#060633] px-10 rounded-xl md:rounded-none md:w-[200px] shadow-xl text-white">
          <Profile />
        </section>

        <div className="w-full md:absolute md:top-0 md:left-[210px] md:h-screen md:w-[88%] md:overflow-auto py-4  bg-[#f0f9ff] px-3 md:px-10 rounded-xl md:rounded-none shadow-xl flex flex-wrap justify-between">
          <div className="hidden md:flex flex-col w-screen">
            <h4>Admin Dashboard</h4>
            <h6 className="text-[#666674]">Church Database Management</h6>
          </div>

          <div className="flex flex-wrap justify-between w-full">
            {/* search workers */}
            <section className="flex flex-col grow justify-center items-center bg-[#e0f2fe] p-2 md:p-5 rounded-md border-2 w-full md:max-w-[60%]">
              <h6>Manage Users</h6>
              <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] my-2 p-2 md:p-5 rounded-xl shadow-xl text-white w-full">
                <Searchworkers />
              </div>
            </section>

            {/* Register a User */}
            <section className="flex flex-col grow justify-center items-center bg-[#e0f2fe] p-2 md:p-5 rounded-md border-2 w-full md:max-w-[40%]">
              <h6>Register User</h6>
              <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl w-full">
                <RegisterForm />
              </div>
            </section>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-2">
            {/* Register Altar Call or First Timer */}
            <section className="flex flex-wrap grow justify-center gap-5 items-center my-2 bg-[#e0f2fe] p-2 md:p-5 rounded-md border-2">
              <div className="flex flex-col items-center">
                <h6>Follow Up Management</h6>
                <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl w-full">
                  <AltarCallFormOrFirstTimer />
                </div>
              </div>
            </section>
            {/* Testimonies and prayer request views section */}
            <section className="flex flex-wrap grow justify-center gap-2 items-center my-2 bg-[#e0f2fe] p-2 md:p-5 rounded-md border-2">
              <h6>Testimonies and Prayer Requests</h6>
              <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl w-full">
                <ViewTestimonies />
              </div>
              <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl w-full">
                <ViewPrayerReqest />
              </div>
            </section>
          </div>

          {/* Manage website contents */}
          <section className="flex flex-wrap justify-between gap-2 items-center my-2 bg-[#e0f2fe] p-2 md:p-5 rounded-md border-2 w-full">
            <h6 className="w-full">Website Contents Management</h6>
            <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl grow w-full md:max-w-[73%]">
              <UpdateSlider />
            </div>
            <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl grow-2 w-full md:max-w-[25%]">
              <UpdateGallery />
            </div>
            <div className="bg-gradient-to-tr from-[#7dd3fc] via-[#f0abfc] to-[#0c4a6e] p-2 md:p-5 rounded-xl shadow-xl w-full">
              <UpdateEvents />
            </div>
          </section>

          {/* Attendance view section */}
          <section className="my-2 w-full">
            <ViewAttendance />
          </section>
        </div>
      </div>
    );
}

export default Page