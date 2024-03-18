'use client'

import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import CreateListButton from '../Buttons/CreateListButton'
import Link from 'next/link'

export const Sidebar = () => {

    const [dataLists, setDataLists] = useState<any[]>([])

    const renderLists = async () => {
  
        const { data: { user } } = await supabase.auth.getUser()
  
        const { data, error } = await supabase
            .from('users_lists')
            .select('name, id, user_id')
            .eq('user_id', user?.id)
  
        if (error) {
            console.log(error)
        }
  
        if (data) {
            setDataLists(data)
            console.log(data)
        }
    }
  
    useEffect(() => {
        renderLists()
    }, [])

  return (
    <div className='hidden md:flex items-center flex-col mt-10 bg-gray-200 h-full md:w-1/6 px-2 py-4 rounded-lg'>
        <Link href={`/profile//lists`}> 
            <h3 className='text-gray-400 text-m font-medium'>Lists</h3>
        </Link>
        <ul className='w-full flex flex-col'>
        {
            dataLists.map((list, index) => (
            <Link key={index} className='w-full' href={`/profile/${list.user_id}/lists/${list.id}`}>
                <li key={index} className='uppercase bg-black/70 backdrop-blur-sm w-full flex items-center justify-center p-1 rounded text-white mt-2 text-sm'>
                    {list.name}
                </li>
            </Link>
            ))
        }
        </ul>
        <CreateListButton/>
  </div>
  )
}
