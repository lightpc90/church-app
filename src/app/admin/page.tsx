
import React, { Suspense } from "react";
import AdminComponent from "@/components/admin/Admin";


const AdminDashboard = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-screen">
        <AdminComponent />
      </div>
    </Suspense>
  );
};

export default AdminDashboard;
