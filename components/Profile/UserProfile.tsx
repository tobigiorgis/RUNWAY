
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { CalendarIcon } from 'lucide-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { RenderPosts } from '@/components/OtherUserPosts/RenderPosts'
import { FollowButton } from '@/components/Buttons/FollowButton'
import UnfollowButton from '@/components/Buttons/UnfollowButton'
import { Footer } from '@/components/ui/Footer'
import { RenderLikedPosts } from '@/components/OtherUserPosts/RenderLikedPosts'
import ShareOtherProfileButton from '@/components/Buttons/ShareOtherProfileButton'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from '../ui/dialog'
import { createClient } from '@/utils/supabase/client'


const UserProfile = () => {

    const supabase = createClient()
    const searchParams = useSearchParams()
    const q = searchParams.get('q') || 'posts'

    const [profile, setProfile] = useState<any[]>([])

    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const pathname = usePathname()
    const userId = pathname.split('/')[2]


    
    const getProfiles = async () => {

        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)

        if (error) {
            console.log(error)
        }

        if (profiles) {
            setProfile(profiles)
        }
        
    }

    const followersCount = profile[0]?.followers_count
    const followingCount = profile[0]?.following_count

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
        // console.log(followStatus);
        if (error) {
            console.log(error);
        }
        
      }

    useEffect(() => {
        checkFollowStatus();
        // console.log(isFollowing);
        getProfiles()
      }, [userId, isFollowing]);

  return (
    <main className={`w-full h-full pt-20 flex items-center flex-col justify-between`}>
    {profile.map((profile: any, key: number) => {
        return (
            <div key={key} className='flex items-center flex-col gap-5 pt-10'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Avatar>
                            <AvatarImage src={profile.profile_pic} />
                            <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                </Dialog>
                <div className='flex items-center flex-col gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <h1 className='font-bold' >{profile.username}</h1>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 bg-zinc opacity-80">
                                <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">{profile.full_name}</h4>
                                        <p className="text-sm">
                                            {profile.bio}
                                        </p>
                                        <div className="flex items-center pt-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">
                                            joined {profile.created_at}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        {/* <h3 className='text-gray'>Followers {profile.followers_count}</h3> */}
                        {/* <h3 className='text-gray'>Following {profile.following_count}</h3> */}
                    </div>
                    <div className='flex justify-center flex-col items-center'>
                        <p className='text-dark text-sm'>{profile.style}</p>
                        <p className=''>{profile.bio}</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2 w-3/4'>
                    {/* <button onClick={handleFollow} className={`w-auto font-medium text-black rounded py-1 px-2 ${isFollowing ? 'bg-black text-zinc-200' : 'bg-[#E5E4E2]'}`}> */}
                    { isFollowing ?      
                        <UnfollowButton userId={userId} followers={followersCount} following={followingCount}/>
                        : 
                        <FollowButton userId={userId} followers={followersCount} following={followingCount}/>
                    }
                    <ShareOtherProfileButton />
                    <button className='w-auto bg-black text-white rounded py-1 px-2'>
                        <Link href={`/lists/${userId}`}>
                            Lists
                        </Link>
                    </button>
                </div>
                <div className='flex items-center gap- w-4/6'>
                        <div className='w-1/2 flex items-center justify-center'>
                            <Link 
                                className={`font-semibold  ${ q === 'posts' ? 'border-b-2 border-black' : ''}`}
                                href={`/profile/${userId}?q=posts`}
                                >
                                Posts
                            </Link>
                        </div>
                        <div className='w-1/2 flex items-center justify-center'>
                            <Link 
                                className={`font-semibold  ${ q === 'liked' ? 'border-b-2 border-black' : ''}`}
                                href={`/profile/${userId}?q=liked`}
                                >
                                Liked
                            </Link>
                        </div>
                    </div>
            </div>
        )
    })}
        {/* <div className='w-full h-fit flex md:flex-row flex-col md:px-20 px-10 py-10 gap-7 flex-wrap justify-between'> */}
        {
            q === 'posts' ? (
                <RenderPosts />
            ) : (
                <RenderLikedPosts />
                )
        }
        {/* </div> */}
    <Footer/>
</main>
  )
}

export default UserProfile


