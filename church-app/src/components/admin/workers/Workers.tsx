'use client'

import Button from '@/components/ui/Button'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'

export type Worker = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    dept: string,
}
 
export const columns: ColumnDef<Worker>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "dept",
    header: "dept",
  },
];

const data = [
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
    {_id: '1', name: 'Folahan Abbey', email: 'gideonabbey.f@gmail.com', phone: '08130853142', dept: 'Media & Technical'},
]

const Workers = () => {
  return (
    <div className='m-10 flex flex-col gap-5'>
        <Button className='w-fit'>
            Register a Worker
        </Button>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Workers