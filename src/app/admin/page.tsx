import Link from "next/link";
import React from "react";
import TabLinks from "@/components/admin/TabLinks";
import AdminComponent from "@/components/admin/Admin";


const AdminDashboard = () => {
  return (
    <div className='h-screen'>
        <AdminComponent/>
    </div>
  );
};

export default AdminDashboard;
