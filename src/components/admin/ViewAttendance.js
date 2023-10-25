import React from 'react'

const ViewAttendance = () => {
  return (
    <div>
      <section className="flex flex-col mb-2 w-[340px] overflow-auto border-2 rounded-xl p-5 ">
        {/* Attendance Stat Summary */}
        <div className="my-3">
          <h5>Attendance Stat</h5>
          <p>Total:</p>
          <p>Male:</p>
          <p>Female:</p>
        </div>
        {/* Stat Summary by Department */}
        <div className="my-3">
          <h6>Stat By Department</h6>
          <section>
            <div>Media&Technical</div>
            <div>Choir</div>
            <div>Sunday School</div>
            <div>Protocol</div>
            <div>Children Dept</div>
            <div>Ushering</div>
            <div>Prayer</div>
            <div>Ministers</div>
          </section>
        </div>
        {/* Last 3 sundays */}
        <div className="my-3">
          <h6>Last 3 Sundays</h6>
          <div>3rd sunday</div>
          <div>2nd Sunday</div>
          <div>Last Sunday</div>
        </div>
      </section>
    </div>
  );
}

export default ViewAttendance