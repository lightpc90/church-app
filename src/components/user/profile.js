import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-[200px] my-5">
      {/* Profile avatar */}
      <div
        className="flex justify-center items-center h-[110px] w-[110px] rounded-full overflow-hidden bg-[#070749] my-5"
          >
            <Image src="/avatar.png" alt="dp avatar" width={200} height={200} className="h-full w-full object-cover"/>
      </div>

      <section className="my-2">
        <h6>Contact</h6>
        <p>Username:</p>
        <p>Full Name:</p>
        <p>Phone Number:</p>
        <p>Email:</p>
        <p>Dept:</p>
        <p>Bio:</p>
      </section>

      <section className="my-2">
        <h6>Attendance Stat</h6>
        <p>For the past 3 months</p>
          </section>
          
      <section className="my-2">
        <h6>Your Contents</h6>
        <p>Blogs and Stories you have posted show here</p>
      </section>
    </div>
  );
}

export default Profile