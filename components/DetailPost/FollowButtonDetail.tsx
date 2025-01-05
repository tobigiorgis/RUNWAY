'use client'
import React, { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { followUser } from "@/lib"

export const FollowButtonDetail = ({userId, followers}: any) => {

    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const supabase = createClient()

    const checkFollowStatus = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        const { data: followStatus, error } = await supabase
          .from('users_followers')
          .select('id')
          .eq('follower_id', userId)
          .eq('user_id', user?.id);
      
        if (followStatus && followStatus.length > 0) {
            setIsFollowing(true);
        } 

        if (followStatus && followStatus.length === 0) {
            setIsFollowing(false);
        }
        console.log(followStatus);
        if (error) {
            console.log(error);
        }
        
      }

    useEffect(() => {
        checkFollowStatus();
        console.log(isFollowing);
        
      }, []);

    const addFollower = async () => {
        // Update the followers_count and following_count
        // const newCount = profile[0].followers_count + 1
        const {data, error} = await supabase
        .from('profiles')
        .update({followers_count: followers + 1})
        .eq('id', userId)

        if (error) {
            console.log(error)
        }
        else {data} {
            console.log("New Follower")
        
        }
    }


    const handleFollow = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        const [error, data] = await followUser({ user_id: user!.id, follower_id: userId });


        if (error) {
            console.error('Error following user', error);
          } else {
            console.log('User followed', data);
            addFollower()
            window.location.reload()
          }
    }

  return (
        <button onClick={handleFollow} className='text-dark flex items-start'>
            {isFollowing ? 'Following' : 'Follow +'}
        </button>
  )
}
