'use client'

import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import CreateListButton from '../Buttons/CreateListButton'
import Link from 'next/link'
import { Clock10, FolderOpen, Lock } from 'lucide-react'


export const Sidebar = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const [whichLists, setWhichLists] = useState<boolean>(true)

    const renderLists = async () => {
  
        const { data: { user } } = await supabase.auth.getUser()
  
        const { data, error } = await supabase
            .from('users_lists')
            .select('name, id, user_id, private')
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
    <div className='hidden md:flex items-center flex-col mt-10 bg-black h-full md:w-1/6 px-2 py-4 rounded-lg '>
        <Link className='w-full flex items-center justify-center' href={`/profile//lists`}> 
            {/* <h3 className='text-gray-400 text-m font-medium'>Lists</h3> */}
            <button 
                // onClick={() => setWhichLists(!whichLists)}
                className=' px-2 text-white font-semibold text-md rounded-2xl w-full flex justify-center'
            >
                { whichLists ? 'My lists' : 'Following lists'}
            </button>
        </Link>
        <ul className='w-full flex flex-col'>
        {
            dataLists.map((list, index) => (
            <Link key={index} className='w-full' href={`/profile/${list.user_id}/lists/${list.id}`}>
                <li key={index} className=' backdrop-blur-sm w-full flex items-center justify-between py-1 px-2 rounded text-white hover:bg-slate hover:bg-opacity-10 mt-2 text-sm'>
                    <p>{list.name}</p>
                    { list.private ? 
                        <Lock size={16}/>
                        : 
                        <FolderOpen size={14}/>
                }
                </li>
            </Link>
            ))
        }
        </ul>
        <CreateListButton/>
  </div>
  )
}
