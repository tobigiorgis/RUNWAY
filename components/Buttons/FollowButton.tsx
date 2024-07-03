'use client'

import { followUser } from "@/lib"
import { supabase } from "@/lib/supabase"

export const FollowButton = ({userId, followers, following}: any) => {

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

    const addFollowing = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        // Update the followers_count and following_count
        // const newCount = profile[0].following_count + 1
        const {data, error} = await supabase
        .from('profiles')
        .update({following_count: following + 1})
        .eq('id', user?.id)

        if (error) {
            console.log(error)
        }
        else {data} {
            console.log("New Following")
        
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
            addFollowing()
            window.location.reload()
          }
    }
    

    return (
        <div>
            <button onClick={handleFollow} className='w-auto font-medium text-black rounded py-1 px-2 bg-light'>
                Follow
            </button>
        </div>
    )
}
