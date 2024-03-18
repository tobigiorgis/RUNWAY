import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const Topbar = () => {

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
        }
    }
  
    useEffect(() => {
        renderLists()
    }, [])

  return (
    <div className='w-full md:hidden flex flex-row bg-gray-100 py-3 px-3 rounded'>
        <div className='w-full flex flex-row items-center gap-3 h-full scrollable'>
            {
                dataLists.map((list, index) => (
                    <Link key={index} href={`/profile/${list.user_id}/lists/${list.id}`}>
                        <li key={index} className='uppercase bg-gray-200 backdrop-blur-sm w-fit flex items-center justify-center p-2 rounded text-black text-sm'>
                            {list.name}
                        </li>
                </Link>
                ))
            }
        </div>
        <button className='w-2/5 bg-white px-1 rounded z-10'>
            + New List
        </button>
    </div>
  )
}
