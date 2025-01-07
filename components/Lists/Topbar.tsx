'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import MobileCreateListButton from '../Buttons/MobileCreateListButton'
import { createClient } from '@/utils/supabase/client';

export const Topbar = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const supabase = createClient()

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
        }
    }
  
    useEffect(() => {
        renderLists()
    }, [])

    const widthcalc = dataLists.length * 50

  return (
    <div className='w-full md:hidden flex flex-row gap-2 items-center rounded relative hide-scrollbar'>
        <MobileCreateListButton />
        <div className='w-full flex flex-row items-center gap-3 h-full scrollable overflow-x-auto whitespace-nowrap hide-scrollbar'>
            <div className='flex flex-row gap-3' style={{ minWidth: `${widthcalc}%` }}>
            {
                dataLists.map((list, index) => (
                    <Link key={index} href={`/profile/${list.user_id}/lists/${list.id}`}>
                        <li key={index} className='text-clip text-nowrap bg-light backdrop-blur-sm w-fit flex items-center justify-center py-2 px-3 capitalize rounded-2xl text-dark font-medium text-sm'>
                            {list.name}
                        </li>
                </Link>
                ))
            }
            </div>
        </div>
        {/* <button className='bg-white px-2 py-1 rounded z-10 resize-none text-nowrap absolute right-0 mr-3 backdrop-blur-lg'>
            + New List
        </button> */}

    </div>
  )
}
