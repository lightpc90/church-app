
import React, { Suspense } from "react";
import AdminComponent from "@/components/admin/Admin";


const AdminDashboard = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="">
        <AdminComponent />
      </div>
    </Suspense>
  );
};

export default AdminDashboard;
