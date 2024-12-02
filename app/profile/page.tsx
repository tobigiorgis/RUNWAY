'use client'
import React, { Suspense } from 'react'

import { HomeProfile } from '@/components/Profile/HomeProfile'



const Profile = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
        <HomeProfile/>
    </Suspense>
  )
}

export default Profile