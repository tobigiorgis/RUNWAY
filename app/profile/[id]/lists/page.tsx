'use client'

import CreateListButton from '@/components/Buttons/CreateListButton'
import { GetLists } from '@/components/Lists/GetLists'
import { Sidebar } from '@/components/Lists/Sidebar'
import { Topbar } from '@/components/Lists/Topbar'
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'

const Lists = () => {


  return (
    // <main className='w-full pt-20 flex flex-row md:px-24 h-[80vh] gap-10'>
    <main className='w-full'>
        <div className='w-full mt-10 h-full flex flex-col gap-5 md:gap-0'>
          <Topbar />
          <GetLists />
        </div>
    </main>
  )
}

export default Lists