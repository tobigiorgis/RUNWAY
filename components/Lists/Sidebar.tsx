'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CreateListButton from '../Buttons/CreateListButton'
import Link from 'next/link'
import { Clock10, FolderOpen, Lock, Star } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { createClient } from '@/utils/supabase/client'


export const Sidebar = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const [followingLists, setFollowingLists] = useState<any[]>([])
    const supabase = createClient()
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const q = searchParams.get('q') || 'Runways'

    const userId = pathname.split('/')[2]
    const [isOwner, setIsOwner] = useState(false)


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
        setIsOwner(user?.id === userId)
    }

    const renderFollowingLists = async () => {
        
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('users_following_lists')
            .select('*, users_lists(*)')
            .eq('user_id', user?.id)

        
            if (error) {
                console.log(error)
            }
      
            if (data) {
                setFollowingLists(data)
                console.log(data)
            }
    }
  
    useEffect(() => {
        if (q === 'Runways') {
            renderLists();
        } else if (q === 'Following') {
            renderFollowingLists();
        }
    }, [q]);

    const handleSelectChange = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('q', value)
        router.push(`${pathname}?${newSearchParams.toString()}`)
      }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='hidden md:flex items-center flex-col mt-5 bg-black h-full md:w-1/6 px-2 py-4 rounded-lg '>
        <Link className='w-full flex items-center justify-center' href={`/profile/lists`}> 
            {/* <h3 className='text-gray-400 text-m font-medium'>Lists</h3> */}
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px] bg-black text-white px-2">
                    <SelectValue placeholder={q} />
                </SelectTrigger>
                <SelectContent className='bg-zinc'>
                    <SelectItem className='bg-zinc border-none' value="Runways">
                        Runways
                    </SelectItem>
                    <SelectItem className='bg-zinc border-none' value="Following">Following runways</SelectItem>
                </SelectContent>
            </Select>
            {/* <button 
                // onClick={() => setWhichLists(!whichLists)}
                className=' px-2 text-white font-semibold text-md rounded-2xl w-full flex justify-center'
            >
                { whichLists ? 'My lists' : 'Following lists'}
            </button> */}
        </Link>
        <ul className='w-full flex flex-col'>
        {
            q === 'Runways' ?
                dataLists.map((list, index) => (
                <Link key={index} className='w-full' href={`/lists/${list.user_id}/${list.id}?q=${q}`}>
                    <li key={index} className={`backdrop-blur-sm w-full flex items-center justify-between py-1 px-2 rounded text-white hover:bg-slate hover:bg-opacity-10 mt-2 text-sm ${
                  pathname === `/lists/${list.user_id}/${list.id}` ? 'font-semibold' : ''}`}>
                        <p>{list.name}</p>
                        { list.private ? 
                            <Lock size={16}/>
                            : 
                            <FolderOpen size={14}/>
                    }
                    </li>
                </Link>
            ))
            : 
                followingLists.map((list, index) => (
                <Link key={index} className='w-full' href={`/lists/${list.users_lists.user_id}/${list.list_id}?q=${q}`}>
                    <li key={index} className=' backdrop-blur-sm w-full flex items-center justify-between py-1 px-2 rounded text-white hover:bg-slate hover:bg-opacity-10 mt-2 text-sm'>
                        <p>{list.users_lists.name}</p>
                        <Star size={14}/>
                    </li>
                </Link>
            ))
        }
        </ul>
        {
            isOwner ?
            <CreateListButton/>
            : ''
        }
  </div>
  </Suspense>
  )
}
