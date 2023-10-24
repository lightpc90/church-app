import Profile from "@/components/user/profile"
import Searchworkers from "@/components/admin/Searchworkers"

const Page = () => {
    return (
      <div className="mt-[80px] ml-[30px] md:ml-[70px]">
        <h4>Admin Dashboard</h4>
        <Profile />
      </div>
    );
}

export default Page