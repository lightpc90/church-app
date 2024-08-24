import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { PrayerRequestData } from '@/components/data/Data'
import { prayerRequestColumns } from '@/components/ui/prayerRequestColumns'

const PrayerRequest = () => {
  return (
    <div className=' lg:m-10'>
       <h1 className="text-2xl font-bold text-blue-800 mb-5">Prayer Requests</h1>
      <DataTable columns={prayerRequestColumns} data={PrayerRequestData} />
    </div>
  )
}

export default PrayerRequest