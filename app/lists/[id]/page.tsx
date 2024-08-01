
import React from 'react'
import GetOtherLists from '@/components/Lists/GetOtherLists'


const OtherUserLists = () => {


  return (
    <main className='w-full'>
        <div className='w-full mt-10 h-full flex flex-col gap-5 md:gap-0'>
          <GetOtherLists />
        </div>
    </main>
    )
    }

export default OtherUserLists