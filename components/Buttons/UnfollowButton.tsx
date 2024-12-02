import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { supabase } from '@/utils/supabase/server'
import { unfollowUser } from '@/lib'

const UnfollowButton = ({userId, followers, following}: any) => {

    const removeFollower = async () => {
        // Update the followers_count and following_count
        const {data, error} = await supabase
        .from('profiles')
        .update({followers_count: followers - 1})
        .eq('id', userId)

        if (error) {
            console.log(error)
        }
        else {data} {
            console.log("New Follower")
        
        }
    }

    const removeFollowing = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        // Update the followers_count and following_count
        const {data, error} = await supabase
        .from('profiles')
        .update({following_count: following - 1})
        .eq('id', user?.id)

        if (error) {
            console.log(error)
        }
        else {data} {
            console.log("Removed Following")
        
        }
    }

    const handleUnfollow = async () => {
        const { data: { user } } = await supabase.auth.getUser()
      
        const [error, data] = await unfollowUser({ user_id: user!.id, follower_id: userId });
      
        if (error) {
          console.error('Error unfollowing user', error);
        } else {
          console.log('User unfollowed', data);
          removeFollower()
          removeFollowing()
          // Refresh page
            window.location.reload()
        }
      }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <button className='w-auto text-white rounded py-1 px-2 bg-black h-fit' >Following</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>UNFOLLOW ALERT</AlertDialogTitle>
                <AlertDialogDescription>
                    You are currently following this user. Do you want to unfollow him?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleUnfollow}>Unfollow</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default UnfollowButton